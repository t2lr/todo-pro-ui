import { useMemo } from 'react';
import { AuthStateContext, useFirebaseContext } from './useFirebaseProvider';

const useFirebase = () => {
  const { status, userId, email, displayName, photoURL } =
    useFirebaseContext() as AuthStateContext;

  return useMemo(() => {
    return { status, userId, email, displayName, photoURL };
  }, [status, userId, email, displayName, photoURL]);
};

export default useFirebase;
