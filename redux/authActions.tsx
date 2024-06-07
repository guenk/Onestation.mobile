export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";

interface LoginSuccessPayload {
  token: string;
  user: User;
}

interface UpdateUserPayload {
  pseudo?: string;
  email?: string;
  avatar?: string;
  id_role?: number;
  label?: string;
}

interface User {
  pseudo: string;
  email: string;
  avatar?: string;
  role: {
    id_role: number;
    label: string;
  };
}

export const loginSuccess = (token: string, user: User) => ({
  type: LOGIN_SUCCESS,
  payload: { token, user } as LoginSuccessPayload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUser = (pseudo?: string, email?: string, avatar?: string, id_role?: number, label?: string) => ({
  type: UPDATE_USER,
  payload: { pseudo, email, avatar, id_role, label } as UpdateUserPayload,
});
