import { UserResDto } from '../dto';

export type UserPaginationDto = {
  users: UserResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
