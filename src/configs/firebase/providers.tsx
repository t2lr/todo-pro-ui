import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { AuthStateContext } from '@/hooks/useFirebaseProvider';
import { auth, googleProvider } from '@/configs/firebase';

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    return result.user;
  } catch (e) {
    alert((e as Error).message);
  }
};

interface PropsRegister {
  email: string;
  password: string;
}

export const signInWithCredentials = async ({
  email,
  password
}: PropsRegister) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);

    return resp.user;
  } catch (e) {
    alert((e as Error).message);
  }
};

export const loginWithCredentials = async ({
  email,
  password
}: PropsRegister) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);

    return resp.user;
  } catch (e) {
    alert((e as Error).message);
  }
};

type StateDispatch = React.Dispatch<
  React.SetStateAction<
    Pick<
      AuthStateContext,
      'status' | 'userId' | 'displayName' | 'email' | 'photoURL'
    >
  >
>;

export const onAuthStateHasChanged = (setSession: StateDispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (!user)
      return setSession({
        status: 'no-authenticated',
        userId: null,
        displayName: null,
        email: null,
        photoURL: null
      });

    setSession({
      status: 'authenticated',
      userId: user!.uid,
      displayName: user!.displayName,
      email: user!.email,
      photoURL: user!.photoURL
    });
  });
};

export const logoutFirebase = async () => await auth.signOut();
