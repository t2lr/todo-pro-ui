import { createContext, useContext, useEffect, useState } from 'react';
import {
  logout,
  onAuthStateHasChanged,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword
} from '@/entities/user/api';
import { Author } from '@/entities/user/model';
import { AuthLoginDto } from '@/entities/user/dto';
import Cookies from 'js-cookie';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/shared/config';

export interface AuthStateContext {
  userId: string | null;
  username: string | null;
  email: string | null;
  src: string | null;
  status: 'checking' | 'authenticated' | 'no-authenticated';
  handleLoginWithEmailAndPassword: (body: AuthLoginDto) => Promise<Author>;
  handleRegisterWithEmailAndPassword: (
    password: string,
    email: string
  ) => Promise<void>;
  handleLogOut: () => Promise<boolean>;
}

const initialState: Pick<
  AuthStateContext,
  'status' | 'userId' | 'username' | 'email' | 'src'
> = {
  userId: null,
  username: null,
  email: null,
  src: null,
  status: 'checking'
};

export const AuthContext = createContext({} as AuthStateContext);

interface IElement {
  children: JSX.Element | JSX.Element[];
}

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: IElement) => {
  const [session, setSession] = useState(initialState);

  useEffect(() => {
    onAuthStateHasChanged().then((data) => {
      setSession({
        userId: data.id,
        email: data.email,
        username: data.username,
        src: data.src,
        status: 'authenticated'
      });
    });
  }, []);

  const handleLogOut = async () => {
    setSession({
      userId: null,
      email: null,
      username: null,
      src: null,
      status: 'no-authenticated'
    });
    return await logout();
  };

  const validateAuth = (data: Author | undefined) => {
    if (data) {
      const { username, email, id, src } = data;
      return setSession({
        userId: id,
        email,
        username,
        src,
        status: 'authenticated'
      });
    }

    handleLogOut();
  };

  const checking = () =>
    setSession((prev) => ({ ...prev, status: 'checking' }));

  const handleLoginWithEmailAndPassword = async (body: AuthLoginDto) => {
    checking();
    const data = await signInWithEmailAndPassword(body);
    validateAuth(data);
    return data;
  };

  const handleRegisterWithEmailAndPassword = async () => {
    checking();
    const data = await signUpWithEmailAndPassword();
    console.log(data);
  };

  return (
    <AuthContext.Provider
      value={{
        ...session,
        handleLoginWithEmailAndPassword,
        handleRegisterWithEmailAndPassword,
        handleLogOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
