import { BaseModel } from '@/entities/base';
import { Task } from '@/entities/task/model';

export type UseCase = {
  id: string;
  title: string;
  description: string;
  estimated_time: number;
  project_id: string;
  user_story_id: string;
  tasks?: Task[];
} & BaseModel;
