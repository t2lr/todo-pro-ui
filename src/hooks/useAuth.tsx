import { useMemo } from 'react';
import { AuthStateContext, useAuthContext } from './useAuthProvider';

const useAuth = () => {
  const {
    status,
    userId,
    email,
    src,
    username,
    handleLoginWithEmailAndPassword,
    handleRegisterWithEmailAndPassword,
    handleLogOut
  } = useAuthContext() as AuthStateContext;

  return useMemo(() => {
    return {
      status,
      userId,
      email,
      src,
      username,
      handleLoginWithEmailAndPassword,
      handleRegisterWithEmailAndPassword,
      handleLogOut
    };
  }, [
    status,
    userId,
    email,
    src,
    username,
    handleLoginWithEmailAndPassword,
    handleRegisterWithEmailAndPassword,
    handleLogOut
  ]);
};

export default useAuth;
