import { apiClient } from '@/shared/api/base';
import { CommentResDto } from '../dto';
import { Comment } from '../model';

export const createComment = async (
  body: Partial<Comment>
): Promise<CommentResDto> => {
  const { sub_task_id, ...bodyWithoutId } = body;
  const result = await apiClient.post<CommentResDto>(
    `/sub_tasks/${sub_task_id}/comments`,
    bodyWithoutId
  );

  return result;
};
