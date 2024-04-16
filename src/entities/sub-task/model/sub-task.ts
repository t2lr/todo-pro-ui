import { BaseModel } from '@/entities/base';
import { WorkLog } from '@/entities/work-log/model';
import { Nullable } from '@/shared/types';

export type SubTask = {
  id: string;
  title: string;
  description: string;
  estimated_time: number;
  task_id: string;
  use_case_id: string;
  project_id: string;
  user_story_id: string;
  phase_id: string;
  category_id: string;
  progress_id: string;
  priority_id: string;
  deadline: Date;
  start_date: Date;
  assignment_id: Nullable<string>;
  work_logs: WorkLog[];
} & BaseModel;
