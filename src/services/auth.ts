// In this file will be use LocalStorage instead of API calls
// This is a requirement required for this techincal test

import { UserType } from "@/types/auth";

// clave donde guardaremos los usuarios
const USERS_KEY = "users";
const CURRENT_USER_KEY = "user";

function getUsers(): Record<string, UserType> {
  const raw = localStorage.getItem(USERS_KEY);

  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, UserType>;
  } catch {
    // resetear clave corrupta
    localStorage.setItem(USERS_KEY, JSON.stringify({}));

    return {};
  }
}

// guardar todos los usuarios
function saveUsers(users: Record<string, UserType>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ================== AUTH METHODS ==================

export async function register(user: UserType) {
  const users = getUsers();

  if (users[user.email]) {
    throw new Error("El usuario ya existe");
  }

  users[user.email] = user;
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return user;
}

export async function login(email: string, password: string) {
  const users = getUsers();

  const user = users[email];

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (user.password !== password) {
    throw new Error("Contraseña incorrecta");
  }

  // guardar usuario actual logueado
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return user;
}

export async function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);

  // eliminar cookie
  document.cookie = "user=; path=/; max-age=0";

  return true;
}

export async function getCurrentUser(): Promise<UserType> {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  if (!user) {
    throw new Error("No hay usuario logueado");
  }

  //TODO : usar try
  return JSON.parse(user);
}

export async function updateUser(user: UserType): Promise<UserType> {
  const users = getUsers();

  if (!users[user.email]) {
    throw new Error("Usuario no encontrado");
  }

  users[user.email] = user;
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return user;
}
