import { UploadResult, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

async function uploadFile(file: Blob, id: string): Promise<UploadResult> {
  const storageRef = ref(storage, id);

  return await uploadBytes(storageRef, file);
}

export { uploadFile };
