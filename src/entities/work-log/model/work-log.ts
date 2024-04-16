import { BaseModel } from '@/entities/base';
import { ProgressResDto } from '@/entities/progress/dto';

export type WorkLog = {
  id: string;
  title: string;
  description: string;
  actual_time: number;
  sub_task_id: string;
  project_id: string;
  progress_id: string;
  progress?: ProgressResDto;
} & BaseModel;
