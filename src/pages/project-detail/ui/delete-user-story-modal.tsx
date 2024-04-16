import { ExclamationCircleFilled } from '@ant-design/icons';
import { UseMutationResult } from '@tanstack/react-query';
import { Modal, message } from 'antd';

import { UserStory } from '@/entities/user-story/model';

const { confirm } = Modal;

export const confirmDeleteUserStory = (
  projectId: string,
  user_story: UserStory,
  useUserStory: UseMutationResult,
  refetchProjectDetail: any
) => {
  const handleDeleteProject = async () => {
    await useUserStory.mutateAsync({
      id: user_story.id,
      project_id: projectId
    });
    message.success('Delete User Story Success');
    refetchProjectDetail();
  };

  confirm({
    title: 'Do you Want to delete user story?',
    icon: <ExclamationCircleFilled />,
    content: (
      <div className="">
        <h1 className="">{user_story.title}</h1>
        <h1 className="">{user_story.description}</h1>
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
