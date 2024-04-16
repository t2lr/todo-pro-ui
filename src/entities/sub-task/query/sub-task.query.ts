export type SubTaskQuery = {
  start_date: Date;
  end_date: Date;
  pageIndex: number;
  pageSize: number;
};

export type SubTaskDetailQuery = {
  id: string;
  project_id: string;
};
