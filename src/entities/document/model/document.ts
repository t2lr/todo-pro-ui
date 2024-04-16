import { BaseModel } from '@/entities/base';
import { User } from '@/entities/user/model';

export type Document = {
  id: string;
  content: string;
  file: string | FormData;
  project_id: string;
  user: User;
} & BaseModel;
