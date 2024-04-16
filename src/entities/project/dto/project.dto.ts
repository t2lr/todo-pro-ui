import { AssignmentResDto } from '@/entities/assignments/dto';
import { BaseResDto } from '@/entities/base/dto';
import { UserStory } from '@/entities/user-story/model';
import { Nullable } from '@/shared/types';

export type ProjectResDto = {
  id: string;
  title: string;
  description: string;
  src: Nullable<string>,
  start_time: Date;
  end_time: Date;
  assignments: AssignmentResDto[];
  user_stories: UserStory[];
} & BaseResDto;
