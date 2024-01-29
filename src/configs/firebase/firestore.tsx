import {
  DocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import {
  addDoc,
  getFirestore,
  DocumentReference,
  getDocs,
  QuerySnapshot
} from 'firebase/firestore';

import { app } from './app';

const db = getFirestore(app);

async function createDocument<T extends Record<string, any>>(
  colection: string,
  data: T
): Promise<DocumentReference> {
  try {
    return await addDoc(collection(db, colection), data);
  } catch (error) {
    throw error;
  }
}

async function getDocuments(name: string): Promise<QuerySnapshot> {
  return await getDocs(collection(db, name));
}

async function getDocument(
  name: string,
  id: string
): Promise<DocumentSnapshot> {
  return await getDoc(doc(db, name, id));
}

async function updateDocument<T extends Record<string, any>>(
  name: string,
  id: string,
  data: T
) {
  return await updateDoc(doc(db, name, id), data);
}

async function deleteDocument(collection: string, id: string) {
  return await deleteDoc(doc(db, collection, id));
}

export {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument
};
