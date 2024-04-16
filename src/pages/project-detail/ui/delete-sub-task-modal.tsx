import { ExclamationCircleFilled } from '@ant-design/icons';
import { UseMutationResult } from '@tanstack/react-query';
import { Modal, message } from 'antd';

import { SubTask } from '@/entities/sub-task/model';

const { confirm } = Modal;

export const confirmDeleteSubTask = (
  projectId: string,
  sub_task: SubTask,
  useUseCase: UseMutationResult,
  refetchProjectDetail: any
) => {
  const handleDeleteProject = async () => {
    await useUseCase.mutateAsync({
      id: sub_task.id,
      project_id: projectId,
      user_story_id: sub_task.user_story_id,
      use_case_id: sub_task.use_case_id
    });
    message.success('Delete SubTask Success');
    refetchProjectDetail();
  };

  confirm({
    title: 'Do you Want to delete sub task?',
    icon: <ExclamationCircleFilled />,
    content: (
      <div className="">
        <h1 className="">{sub_task.title}</h1>
        <h1 className="">{sub_task.description}</h1>
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
