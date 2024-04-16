import { Assignment } from '@/entities/assignments/model';
import { BaseResDto } from '@/entities/base/dto';
import { CommentResDto } from '@/entities/comment/dto';
import { WorkLogResDto } from '@/entities/work-log/dto';
import { Nullable } from '@/shared/types';

export type SubTaskResDto = {
  id: string;
  title: string;
  description: string;
  estimated_time: number;
  assignment_id: Nullable<string>;
  progress_id: string;
  task_id: string;
  use_case_id: string;
  project_id: string;
  user_story_id: string;
  deadline: Date;
  start_date: Date;
  assignment: Nullable<Assignment>;
  work_logs: WorkLogResDto[];
  comments: CommentResDto[];
  commentCount: number;
} & BaseResDto;
