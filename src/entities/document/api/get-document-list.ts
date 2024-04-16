import { apiClient } from '@/shared/api/base';
import { DocumentQuery } from '../query';
import { DocumentPaginationDto } from '../model';

export const searchDocuments = async (
  pageIndex: number,
  pageSize: number
): Promise<DocumentPaginationDto> => {
  const query: DocumentQuery = { pageIndex, pageSize };

  const result = await apiClient.get<DocumentPaginationDto>(
    '/work_logs/search',
    query
  );

  return {
    documents: result.documents,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
