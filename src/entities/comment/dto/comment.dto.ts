import { BaseResDto } from '@/entities/base/dto';
import { UserResDto } from '@/entities/user/dto';

export type CommentResDto = {
  id: string;
  content: string;
  project_id: string;
  sub_task_id: string;
  user: UserResDto;
} & BaseResDto;
