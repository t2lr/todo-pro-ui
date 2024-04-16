import { BaseResDto } from '@/entities/base/dto';

export type UserStoryResDto = {
  id: string;
  title: string;
  description: string;
} & BaseResDto;
