import { apiClient } from '@/shared/api/base';
import { Document } from '../model';

export const createDocument = async (body: Partial<Document>): Promise<any> => {
  const { project_id, ...bodyWithoutId } = body;

  const result = await apiClient.upload(
    `/projects/${project_id}/documents`,
    bodyWithoutId.file
  );

  return result;
};
