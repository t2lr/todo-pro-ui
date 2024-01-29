import { createContext, useContext, useEffect, useState } from 'react';
import {
  loginWithCredentials,
  logoutFirebase,
  onAuthStateHasChanged,
  signInWithCredentials,
  singInWithGoogle
} from '@/configs/firebase/providers';
import { User } from 'firebase/auth';

export interface AuthStateContext {
  userId: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  status: 'checking' | 'authenticated' | 'no-authenticated';
  handleLoginWithGoogle: () => Promise<void>;
  handleLoginWithCredentials: (
    password: string,
    email: string
  ) => Promise<void>;
  handleRegisterWithCredentials: (
    password: string,
    email: string
  ) => Promise<void>;
  handleLogOut: () => Promise<void>;
}

const initialState: Pick<
  AuthStateContext,
  'status' | 'userId' | 'displayName' | 'email' | 'photoURL'
> = {
  userId: null,
  displayName: null,
  email: null,
  photoURL: null,
  status: 'checking'
};

export const AuthContext = createContext({} as AuthStateContext);

interface IElement {
  children: JSX.Element | JSX.Element[];
}

export const useFirebaseContext = () => useContext(AuthContext);

export default function FirebaseProvider({ children }: IElement) {
  const [session, setSession] = useState(initialState);

  useEffect(() => {
    onAuthStateHasChanged(setSession);
  }, []);

  const handleLogOut = async () => {
    logoutFirebase();
    setSession({
      userId: null,
      status: 'no-authenticated',
      email: null,
      displayName: null,
      photoURL: null
    });
  };

  const validateAuth = (data: User | undefined) => {
    if (data) {
      const { displayName, email, photoURL, uid } = data;
      return setSession({
        userId: uid,
        status: 'authenticated',
        email,
        photoURL,
        displayName
      });
    }
    handleLogOut();
  };

  const checking = () =>
    setSession((prev) => ({ ...prev, status: 'checking' }));

  const handleLoginWithGoogle = async () => {
    checking();
    const data = await singInWithGoogle();
    validateAuth(data);
  };

  const handleLoginWithCredentials = async (
    password: string,
    email: string
  ) => {
    checking();
    const data = await loginWithCredentials({ email, password });
    validateAuth(data);
  };

  const handleRegisterWithCredentials = async (
    password: string,
    email: string
  ) => {
    checking();
    const data = await signInWithCredentials({ email, password });
    validateAuth(data);
  };

  return (
    <AuthContext.Provider
      value={{
        ...session,
        handleLoginWithGoogle,
        handleLoginWithCredentials,
        handleRegisterWithCredentials,
        handleLogOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
