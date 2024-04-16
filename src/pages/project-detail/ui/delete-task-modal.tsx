import { ExclamationCircleFilled } from '@ant-design/icons';
import { UseMutationResult } from '@tanstack/react-query';
import { Modal, message } from 'antd';

import { Task } from '@/entities/task/model';

const { confirm } = Modal;

export const confirmDeleteTask = (
  projectId: string,
  task: Task,
  useUseCase: UseMutationResult,
  refetchProjectDetail: any
) => {
  const handleDeleteProject = async () => {
    await useUseCase.mutateAsync({
      id: task.id,
      project_id: projectId,
      user_story_id: task.user_story_id,
      use_case_id: task.use_case_id
    });
    message.success('Delete Task Success');
    refetchProjectDetail();
  };

  confirm({
    title: 'Do you Want to delete task?',
    icon: <ExclamationCircleFilled />,
    content: (
      <div className="">
        <h1 className="">{task.title}</h1>
        <h1 className="">{task.description}</h1>
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
