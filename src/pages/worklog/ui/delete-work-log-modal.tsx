import { ExclamationCircleFilled } from '@ant-design/icons';
import { UseMutationResult } from '@tanstack/react-query';
import { Modal, message } from 'antd';

import { WorkLog } from '@/entities/work-log/model';

const { confirm } = Modal;

export const confirmDeleteWorkLog = (
  work_log: WorkLog,
  useWorkLog: UseMutationResult,
  refetchProjectList: any
) => {
  const handleDeleteProject = async () => {
    await useWorkLog.mutateAsync({
      id: work_log.id,
      sub_task_id: work_log.sub_task_id
    });
    message.success('Delete WorkLog Success');
    refetchProjectList();
  };

  confirm({
    title: 'Do you Want to delete worklog?',
    icon: <ExclamationCircleFilled />,
    content: (
      <div className="">
        <h1 className="">{work_log.title}</h1>
        <h1 className="">{work_log.description}</h1>
      </div>
    ),
    onOk() {
      return handleDeleteProject();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
};
