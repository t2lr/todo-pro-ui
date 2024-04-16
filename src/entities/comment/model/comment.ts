import { BaseModel } from '@/entities/base';

export type Comment = {
  id: string;
  content: string;
  sub_task_id: string;
  project_id: string;
} & BaseModel;
