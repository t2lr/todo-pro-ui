import { apiClient } from '@/shared/api/base';
import { DocumentResDto } from '../dto';
import { Document } from '../model';

export const updateDocument = async (
  body: Partial<Document>
): Promise<DocumentResDto> => {
  const { project_id, id, ...bodyWithoutId } = body;
  const result = await apiClient.put<DocumentResDto>(
    `/projects/${project_id}/documents/${id}`,
    { ...bodyWithoutId, id }
  );

  return result;
};
