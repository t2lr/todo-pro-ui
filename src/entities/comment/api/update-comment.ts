import { apiClient } from '@/shared/api/base';
import { CommentResDto } from '../dto';
import { Comment } from '../model';

export const updateComment = async (
  body: Partial<Comment>
): Promise<CommentResDto> => {
  const { sub_task_id, id, ...bodyWithoutId } = body;
  const result = await apiClient.put<CommentResDto>(
    `/sub_tasks/${sub_task_id}/work_logs/${id}`,
    { ...bodyWithoutId, sub_task_id, id }
  );

  return result;
};
