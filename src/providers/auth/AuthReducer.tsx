import { UserType } from "@/types/auth";

type AuthState = {
  user: UserType | null;
  isLogged: boolean;
  isAppLoaded: boolean;
};

type AuthAction =
  | { type: "LOGIN"; payload: UserType }
  | { type: "REGISTER"; payload: UserType }
  | { type: "LOGOUT" }
  | { type: "UPDATE"; payload: Partial<UserType> }
  | { type: "SET_APPLOADED" };

export const initialAuthState: AuthState = {
  user: null,
  isLogged: false,
  isAppLoaded: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLogged: true,
        isAppLoaded: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLogged: false,
        isAppLoaded: true,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
        isLogged: true,
        isAppLoaded: true,
      };
    case "SET_APPLOADED":
      return {
        ...state,
        isAppLoaded: true,
      };
    case "UPDATE":
      return state.user
        ? { ...state, user: { ...state.user, ...action.payload } }
        : state;
    default:
      return state;
  }
}
