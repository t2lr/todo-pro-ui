import { Project } from '@/entities/project/model';
import { useAppDispatch, useAppSelector } from '@/stores';
import {
  Avatar,
  Button,
  DatePicker,
  Input,
  message,
  Select,
  Table
} from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { setStartDate } from '@/stores/store';
import { SubTask } from '@/entities/sub-task/model';
import { useState } from 'react';
import { useCreateWorkLog } from '@/features/work-log/create-work-log';
import { Progress } from '@/entities/progress/model';

const { RangePicker } = DatePicker;

type Props = {
  progresses: Progress[];
  sub_tasks: SubTask[];
  refetchProjectList: () => void;
};

type SubTaskProject = {
  id: string;
  title: string;
  description: string;
  estimated_time: number;
  progress_id: string;
  start_date: Date;
  updatedAt: Date;
  project: Project;
};

export const WorkLogTableAction = ({
  sub_tasks,
  refetchProjectList,
  progresses
}: Props) => {
  const createWorkLog = useCreateWorkLog();

  const dispatch = useAppDispatch();
  const actionStartDate = (date: [Date, Date]) => dispatch(setStartDate(date));
  const { start_date } = useAppSelector((state) => state.worklog);

  const [workLogs, setWorkLogs] = useState(sub_tasks);

  const columns: TableProps<SubTaskProject>['columns'] = [
    {
      title: 'Project',
      dataIndex: 'sub_task',
      key: 'sub_task',
      width: 350,
      render: (_, record) => {
        return (
          <div className="flex">
            <Avatar icon={record.project.src} />
            <div className="mx-2">
              <div className="">{record.project.title}</div>
              <div className="">
                {dayjs(record.start_date).format('DD/MM/YYYY HH:mm')}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Task',
      dataIndex: 'worklog',
      key: 'worklog',
      width: 450,
      render: (_, record) => (
        <div>
          <Input
            name={record.id}
            value={record.title}
            onChange={(e) => {
              const index = workLogs.findIndex((item) => item.id === record.id);
              if (index === -1) return;
              const result = [...workLogs];
              result[index] = {
                ...result[index],
                title: e.target.value
              };
              return setWorkLogs(result);
            }}
          />
        </div>
      )
    },
    {
      title: 'Actual time',
      dataIndex: 'estimated_time',
      key: 'estimated_time',
      width: 120,
      render: (_, record) => (
        <div>
          <Input
            type="number"
            value={record.estimated_time}
            name={record.id}
            onChange={(e) => {
              const index = workLogs.findIndex((item) => item.id === record.id);
              if (index === -1) return;
              const result = [...workLogs];
              result[index] = {
                ...result[index],
                estimated_time: Number(e.target.value)
              };
              return setWorkLogs(result);
            }}
          />
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (_, record) => (
        <div>
          <Select
            showSearch
            className="w-full"
            placeholder={`Search to position`}
            optionFilterProp="children"
            value={
              progresses.find((item) => item.id === record.progress_id)?.name
            }
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={progresses.flatMap((progress) => ({
              label: progress.name,
              value: progress.id
            }))}
            onChange={(e) => {
              const index = workLogs.findIndex((item) => item.id === record.id);
              if (index === -1) return;
              const result = [...workLogs];
              result[index] = {
                ...result[index],
                progress_id: e
              };
              return setWorkLogs(result);
            }}
          />
        </div>
      )
    },
    {
      title: 'Note',
      dataIndex: 'record',
      key: 'record',
      width: 350,
      render: (_, record) => (
        <div>
          <TextArea
            name={record.id}
            value={record.description}
            onChange={(e) => {
              const index = workLogs.findIndex((item) => item.id === record.id);
              if (index === -1) return;
              const result = [...workLogs];
              result[index] = {
                ...result[index],
                description: e.target.value
              };
              return setWorkLogs(result);
            }}
          />
        </div>
      )
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => {
        return (
          <div className="">
            <Button
              onClick={async () => {
                await createWorkLog.mutateAsync({
                  sub_task_id: record.id,
                  title: record.title,
                  description: record.description || '',
                  actual_time: record.estimated_time,
                  progress_id: record.progress_id
                });
                message.success('Create Worlog Daily Success!');
                refetchProjectList();
              }}
            >
              Add Worklog daily
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <div className="mb-3 mr-5">
        <RangePicker
          defaultValue={[start_date[0], start_date[1]]}
          onChange={(date) => {
            actionStartDate([dayjs(date[0]) as any, dayjs(date[1]) as any]);
          }}
        />
      </div>
      <Table columns={columns as any} dataSource={workLogs} />
    </div>
  );
};
