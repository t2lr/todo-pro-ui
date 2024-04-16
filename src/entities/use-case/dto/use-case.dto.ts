import { BaseResDto } from '@/entities/base/dto';
import { TaskResDto } from '@/entities/task/dto';

export type UseCaseResDto = {
  id: string;
  title: string;
  description: string;
  tasks: TaskResDto[];
} & BaseResDto;
