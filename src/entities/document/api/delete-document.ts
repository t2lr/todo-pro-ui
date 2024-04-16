import { apiClient } from '@/shared/api/base';
import { DocumentResDto } from '../dto';
import { DocumentDetailQuery } from '../query';

export const deleteDocument = async (
  query: DocumentDetailQuery
): Promise<DocumentResDto> => {
  const { project_id, id } = query;
  const result = await apiClient.delete<DocumentResDto>(
    `/projects/${project_id}/documents/${id}`
  );

  return result;
};
