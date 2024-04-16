import { BaseModel } from '@/entities/base';
import { UseCase } from '@/entities/use-case/model';

export type UserStory = {
  id: string;
  title: string;
  description: string;
  project_id: string;
  use_cases: UseCase[];
} & BaseModel;
