export type WorkLogDetailQuery = {
  project_id: string;
  sub_task_id: string;
  id: string;
};

export type WorkLogQuery = {
  start_date: Date;
  end_date: Date;
  pageIndex: number;
  pageSize: number;
};
