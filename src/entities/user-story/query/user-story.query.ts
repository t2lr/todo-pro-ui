export type UserStoryQuery = {
  pageIndex: number;
  pageSize: number;
};

export type UserStoryDetailQuery = {
  project_id: string;
  id: string;
};
