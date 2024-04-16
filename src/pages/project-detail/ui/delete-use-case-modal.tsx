import { ExclamationCircleFilled } from '@ant-design/icons';
import { UseMutationResult } from '@tanstack/react-query';
import { Modal, message } from 'antd';

import { UseCase } from '@/entities/use-case/model';

const { confirm } = Modal;

export const confirmDeleteUseCase = (
  projectId: string,
  use_case: UseCase,
  useUseCase: UseMutationResult,
  refetchProjectDetail: any
) => {
  const handleDeleteProject = async () => {
    await useUseCase.mutateAsync({
      id: use_case.id,
      project_id: projectId,
      user_story_id: use_case.user_story_id
    });
    message.success('Delete Use Case Success');
    refetchProjectDetail();
  };

  confirm({
    title: 'Do you Want to delete use case?',
    icon: <ExclamationCircleFilled />,
    content: (
      <div className="">
        <h1 className="">{use_case.title}</h1>
        <h1 className="">{use_case.description}</h1>
        <h1 className="">{use_case.estimated_time}</h1>
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
