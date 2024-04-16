import { BaseResDto } from '@/entities/base/dto';

export type DocumentResDto = {
  id: string;
  content: string;
  src: string;
  project_id: string;
} & BaseResDto;
