import { BaseModel } from '@/entities/base';
import { SubTask } from '@/entities/sub-task/model';

export type Task = {
  id: string;
  title: string;
  description: string;
  use_case_id: string;
  project_id: string;
  user_story_id: string;
  sub_tasks: SubTask[];
} & BaseModel;
