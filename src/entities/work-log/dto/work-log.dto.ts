import { BaseResDto } from '@/entities/base/dto';

export type WorkLogResDto = {
  id: string;
  title: string;
  description: string;
  actual_time: number;
  project_id: string;
  sub_task_id: string;
} & BaseResDto;
