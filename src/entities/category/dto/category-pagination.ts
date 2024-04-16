import { CategoryResDto } from '.';

export type CategoryPaginationDto = {
  categories: CategoryResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
