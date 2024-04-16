import { useCreateUserStory, useUpdateUserStory } from '@/features/user-story';
import { STATUS } from '@/shared/configs/constants';
import { AppState } from '@/stores';
import { setStatusModal } from '@/stores/store';
import { Button, Drawer, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  title: string;
  projectId: string;
  refetchProjectDetail: () => void;
};

interface Values {
  title: string;
  description: string;
}

export const CreateUserStoryModal = ({
  projectId,
  title,
  refetchProjectDetail
}: Props) => {
  const createUserStory = useCreateUserStory();
  const updateUserStory = useUpdateUserStory();

  const dispatch = useDispatch();
  const { user_story, status_modal } = useSelector(
    (state: AppState) => state.project
  );

  const isUpdate = status_modal === STATUS.UPDATE_USER_STORY;
  const isCreate = status_modal === STATUS.CREATE_USER_STORY;
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      title: isUpdate ? user_story?.title : '',
      description: isUpdate ? user_story?.description : ''
    },
    onSubmit: async (values) => {
      const methodText = isUpdate ? 'Update' : 'Create';
      if (!isUpdate) {
        await createUserStory.mutateAsync({
          project_id: projectId,
          ...values
        });
      } else {
        await updateUserStory.mutateAsync({
          project_id: projectId,
          id: user_story.id,
          ...values
        });
      }
      message.success(`${methodText} User Story Success!`);
      refetchProjectDetail();
      actionModal(STATUS.NO);
    }
  });

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Drawer
      title={`${isUpdate ? 'Update' : 'Create'} ${title}`}
      closable={false}
      onClose={() => actionModal(STATUS.NO)}
      open={isUpdate || isCreate}
      width="40vw"
    >
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <div className="mb-2">Title</div>
            <Input
              name="title"
              placeholder="Enter title for user story ..."
              value={formik.values.title}
              onChange={onChangeText}
            />
          </div>

          <div className="mb-3">
            <div className="mb-2">Description</div>
            <TextArea
              name="description"
              placeholder="Enter description for user story ..."
              value={formik.values.description}
              onChange={onChangeText}
              rows={5}
            />
          </div>

          <div className="my-3 flex justify-between">
            <Button
              type="primary"
              htmlType="submit"
              loading={createUserStory.isPending}
            >
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
