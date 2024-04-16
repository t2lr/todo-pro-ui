import { useCreateTask } from '@/features/task/create-task';
import { useUpdateTask } from '@/features/task/update-task';
import { STATUS } from '@/shared/configs/constants';
import { useAppSelector } from '@/stores';
import { setStatusModal } from '@/stores/store';
import { Button, Drawer, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

type Props = {
  title: string;
  projectId: string;
  refetchProjectDetail: () => void;
};

interface Values {
  title: string;
  description: string;
}

export const CreateTaskModal = ({
  projectId,
  title,
  refetchProjectDetail
}: Props) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const dispatch = useDispatch();

  const { task, status_modal } = useAppSelector((state) => state.project);
  const isUpdate = status_modal === STATUS.UPDATE_TASK;
  const isCreate = status_modal === STATUS.CREATE_TASK;
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      title: isUpdate ? task.title : '',
      description: isUpdate ? task.description : ''
    },
    onSubmit: async (values) => {
      const methodText = isUpdate ? 'Update' : 'Create';
      if (!isUpdate) {
        await createTask.mutateAsync({
          project_id: projectId,
          user_story_id: task.user_story_id,
          use_case_id: task.use_case_id,
          ...values
        });
      } else {
        await updateTask.mutateAsync({
          project_id: projectId,
          id: task.id,
          user_story_id: task.user_story_id,
          use_case_id: task.use_case_id,
          ...values
        });
      }
      formik.resetForm({});
      message.success(`${methodText} Task Success!`);
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
      open={isUpdate || isCreate}
      closable={false}
      onClose={() => actionModal(STATUS.NO)}
      width="40vw"
    >
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <div className="mb-2">Title</div>
            <Input
              name="title"
              placeholder="Enter title for task ..."
              value={formik.values.title}
              onChange={onChangeText}
            />
          </div>

          <div className="mb-3">
            <div className="mb-2">Description</div>
            <TextArea
              name="description"
              placeholder="Enter description for task ..."
              value={formik.values.description}
              onChange={onChangeText}
              rows={5}
            />
          </div>

          <div className="my-3 flex justify-between">
            <Button
              type="primary"
              htmlType="submit"
              loading={createTask.isPending}
            >
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
