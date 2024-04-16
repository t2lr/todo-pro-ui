import { useCreateUseCase, useUpdateUseCase } from '@/features/use-case';
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
  estimated_time: number;
}

export const CreateUseCaseModal = ({
  projectId,
  title,
  refetchProjectDetail
}: Props) => {
  const createUseCase = useCreateUseCase();
  const updateUseCase = useUpdateUseCase();
  const dispatch = useDispatch();

  const { use_case, status_modal } = useSelector(
    (state: AppState) => state.project
  );
  const isUpdate = status_modal === STATUS.UPDATE_USE_CASE;
  const isCreate = status_modal === STATUS.CREATE_USE_CASE;
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      title: isUpdate ? use_case.title : '',
      description: isUpdate ? use_case.description : '',
      estimated_time: isUpdate ? use_case.estimated_time : 0
    },
    onSubmit: async (values) => {
      const methodText = isUpdate ? 'Update' : 'Create';
      if (!isUpdate) {
        await createUseCase.mutateAsync({
          project_id: projectId,
          user_story_id: use_case.user_story_id,
          ...values
        });
      } else {
        await updateUseCase.mutateAsync({
          project_id: projectId,
          id: use_case.id,
          user_story_id: use_case.user_story_id,
          ...values
        });
      }
      formik.resetForm({});
      message.success(`${methodText} Use Case Success!`);
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
              placeholder="Enter title for use case ..."
              value={formik.values.title}
              onChange={onChangeText}
            />
          </div>

          <div className="mb-3">
            <div className="mb-2">Description</div>
            <TextArea
              name="description"
              placeholder="Enter description for use case ..."
              value={formik.values.description}
              onChange={onChangeText}
              rows={5}
            />
          </div>

          <div>
            <div className="mb-2">Estimated time (hours)</div>
            <Input
              type="number"
              name="estimated_time"
              placeholder="Enter title for use case ..."
              value={formik.values.estimated_time}
              onChange={onChangeText}
            />
          </div>

          <div className="my-3 flex justify-between">
            <Button
              type="primary"
              htmlType="submit"
              loading={createUseCase.isPending}
            >
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
