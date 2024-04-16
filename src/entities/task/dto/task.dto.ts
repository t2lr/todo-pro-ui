import { BaseResDto } from '@/entities/base/dto';
import { SubTaskResDto } from '@/entities/sub-task/dto';

export type TaskResDto = {
  id: string;
  title: string;
  description: string;
  use_case_id: string;
  project_id: string;
  user_story_id: string;
  sub_tasks: SubTaskResDto[];
} & BaseResDto;
