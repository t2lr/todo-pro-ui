import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export { auth, signInWithPopup, googleProvider };
