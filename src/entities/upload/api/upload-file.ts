import { apiClient } from '@/shared/api/base';

export const uploadFile = async (body: any): Promise<Record<string,string>> => {
  const result = await apiClient.upload("/upload/file",body);
  return result as Record<string,string>;
}