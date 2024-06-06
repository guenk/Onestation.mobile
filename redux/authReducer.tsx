import { AnyAction } from 'redux';

interface User {
  pseudo: string;
  email: string;
  avatar?: string;
  role: {
    id_role: number;
    label: string;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user!,
          pseudo: action.payload.pseudo ?? state.user?.pseudo,
          email: action.payload.email ?? state.user?.email,
          avatar: action.payload.avatar ?? state.user?.avatar,
          role: {
            id_role: action.payload.id_role ?? state.user?.role.id_role,
            label: action.payload.label ?? state.user?.role.label,
          },
        },
      };
    default:
      return state;
  }
};

export default authReducer;
