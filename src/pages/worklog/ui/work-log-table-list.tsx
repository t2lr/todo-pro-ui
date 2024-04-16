import { Project } from '@/entities/project/model';
import { WorkLog } from '@/entities/work-log/model';
import { STATUS } from '@/shared/configs/constants';
import { useAppDispatch } from '@/stores';
import { setActionWorkLog } from '@/stores/store/project.store';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Table } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { confirmDeleteWorkLog } from './delete-work-log-modal';
import { useDeleteWorkLog } from '@/features/work-log/delete-work-log';
import { UseMutationResult } from '@tanstack/react-query';

type Props = {
  work_logs: WorkLog[];
  projects: Project[];
  refetchWorkLogs: () => void;
};

type WorkLogProject = {
  id: string;
  title: string;
  description: string;
  actual_time: number;
  progress: Record<string, string>;
  sub_task: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
  project: Project;
};

export const WorkLogTableList = ({ refetchWorkLogs, work_logs }: Props) => {
  const deleteWorkLog = useDeleteWorkLog();

  const dispatch = useAppDispatch();

  const columns: TableProps<WorkLogProject>['columns'] = [
    {
      title: 'Project',
      dataIndex: 'project_title',
      key: 'project_title',
      render: (_, record) => {
        return (
          <div>
            <Avatar icon={record.project.src} /> {record.project.title}
          </div>
        );
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <div>{text}</div>
    },
    {
      title: 'Actual time',
      dataIndex: 'actual_time',
      key: 'actual_time',
      render: (text) => <div>{text} hrs</div>
    },
    {
      title: 'Status',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => <div>{progress.name}</div>
    },
    {
      title: 'Note',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <div>{text}</div>
    },
    {
      title: 'Created At',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: () => <>{dayjs(new Date()).format('DD/MM/YYYY HH:mm')}</>
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => {
        const {
          id,
          title,
          description,
          actual_time,
          createdAt,
          updatedAt,
          progress,
          sub_task,
          project
        } = record;

        return (
          <div className="">
            <EditOutlined
              className="mx-2 cursor-pointer"
              onClick={() => {
                actionWorkLog(
                  {
                    id,
                    title,
                    description,
                    actual_time,
                    sub_task_id: sub_task.id,
                    project_id: project.id,
                    progress_id: progress.id,
                    createdAt,
                    updatedAt
                  },
                  STATUS.UPDATE_WORK_LOG
                );
              }}
            />
            <DeleteOutlined
              className="mx-2 cursor-pointer"
              onClick={() =>
                actionWorkLog(
                  {
                    id,
                    title,
                    description,
                    actual_time,
                    sub_task_id: sub_task.id,
                    project_id: project.id,
                    progress_id: progress.id,
                    createdAt,
                    updatedAt
                  },
                  STATUS.DELETE_WORK_LOG
                )
              }
            />
          </div>
        );
      }
    }
  ];

  const actionWorkLog = (data: WorkLog, status: STATUS) => {
    if (status === STATUS.DELETE_WORK_LOG) {
      confirmDeleteWorkLog(
        data,
        deleteWorkLog as UseMutationResult,
        refetchWorkLogs
      );
    }
    return dispatch(setActionWorkLog({ data, status }));
  };
  console.log(work_logs, 'work_logs');
  return <Table columns={columns} dataSource={work_logs} />;
};
