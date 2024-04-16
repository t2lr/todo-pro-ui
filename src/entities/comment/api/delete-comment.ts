import { apiClient } from '@/shared/api/base';
import { CommentResDto } from '../dto';
import { CommentDetailQuery } from '../query';

export const deleteComment = async (
  query: CommentDetailQuery
): Promise<CommentResDto> => {
  const { sub_task_id, id } = query;
  const result = await apiClient.delete<CommentResDto>(
    `/sub_tasks/${sub_task_id}/comments/${id}`
  );

  return result;
};
