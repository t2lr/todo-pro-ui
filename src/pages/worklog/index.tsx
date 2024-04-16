import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreateWorkLogModal, WorkLogTableAction, WorkLogTableList } from './ui';
import { projectQueries } from '@/entities/project/api';
import { useAppSelector } from '@/stores';
import { subTaskQueries } from '@/entities/sub-task/api';
import { progressQueries } from '@/entities/progress/api';
import { workLogQueries } from '@/entities/work-log/api';

const WorkLog = () => {
  const { start_date } = useAppSelector((state) => state.worklog);

  const { data, isFetching, isLoading, refetch } = useQuery(
    projectQueries.list(1, 25)
  );

  const dataWorkLogs = useQuery(
    workLogQueries.list(1, 25, start_date[0].toDate(), start_date[1].toDate())
  );

  const dataSubTasks = useQuery(
    subTaskQueries.list(1, 25, start_date[0].toDate(), start_date[1].toDate())
  );

  const dataProgresses = useQuery(progressQueries.list(1, 10));

  useEffect(() => {
    dataSubTasks.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start_date]);

  if (
    dataWorkLogs.isFetching ||
    dataWorkLogs.isLoading ||
    isFetching ||
    isLoading ||
    dataSubTasks.isFetching ||
    dataSubTasks.isLoading ||
    dataProgresses.isFetching ||
    dataProgresses.isLoading
  ) {
    return;
  }

  return (
    <div
      className="m-4"
      style={{ height: 'auto', overflowY: 'scroll', scrollbarWidth: 'thin' }}
    >
      <WorkLogTableAction
        sub_tasks={dataSubTasks.data!.sub_tasks!}
        refetchProjectList={refetch}
        progresses={dataProgresses.data!.progress}
      />
      <WorkLogTableList
        projects={data!.projects}
        refetchWorkLogs={dataWorkLogs.refetch}
        work_logs={dataWorkLogs.data!.work_logs}
      />
      <CreateWorkLogModal
        projects={data!.projects}
        refetchWorkLogs={dataWorkLogs.refetch}
        progresses={dataProgresses.data!.progress}
      />
    </div>
  );
};

export default WorkLog;
