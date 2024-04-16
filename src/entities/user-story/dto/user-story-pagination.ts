import { UserStoryResDto } from './user-story.dto';

export type UserPaginationDto = {
  user_stories: UserStoryResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
