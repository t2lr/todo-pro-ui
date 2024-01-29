import { app } from './app';
import { auth, signInWithPopup, googleProvider } from './auth';
import {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument
} from './firestore';
import { uploadFile } from './storage';

export {
  app,
  auth,
  signInWithPopup,
  googleProvider,
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  uploadFile
};
