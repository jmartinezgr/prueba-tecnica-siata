import { UserType } from "@/types/auth";

type AuthState = {
  user: UserType | null;
  loading: boolean;
};

type AuthAction =
  | { type: "LOGIN"; payload: UserType }
  | { type: "REGISTER"; payload: UserType }
  | { type: "LOGOUT" }
  | { type: "UPDATE"; payload: Partial<UserType> }
  | { type: "SET_LOADING"; payload: boolean };

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    case "REGISTER":
      return { ...state, user: action.payload, loading: false };
    case "UPDATE":
      return state.user
        ? { ...state, user: { ...state.user, ...action.payload } }
        : state;
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
