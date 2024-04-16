import { Assignment } from '@/entities/assignments/model';
import { BaseModel } from '@/entities/base';
import { Document } from '@/entities/document/model';
import { UserStory } from '@/entities/user-story/model';
import { Nullable } from '@/shared/types';

export type Project = {
  id: string;
  src: Nullable<string>;
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  assignments: Assignment[];
  user_stories: UserStory[];
  documents: Document[];
} & BaseModel;
