import { Button, DatePicker, Drawer, Input, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';

import { useCreateProject } from '@/features/project';
import { AppState } from '@/stores';
import { setStatusModal } from '@/stores/store';
import { STATUS } from '@/shared/configs/constants';

interface Values {
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
}

export const CreareProjectModal = () => {
  const { mutateAsync, isPending } = useCreateProject();

  const dispatch = useDispatch();
  const { status_modal } = useSelector((state: AppState) => state.project);

  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    initialValues: {
      title: '',
      description: '',
      start_time: new Date(),
      end_time: new Date()
    },
    onSubmit: async (values) => {
      await mutateAsync({
        title: values.title,
        description: values.description,
        start_time: values.start_time,
        end_time: values.end_time
      });

      actionModal(STATUS.NO);
      message.success('Create Project Success!');
    }
  });

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const onChangeDate = (name: string, date: Dayjs): void => {
    formik.setFieldValue(name, dayjs(date).format());
  };

  return (
    <div className="">
      <Drawer
        title={formik.values?.title || 'Create New Project'}
        closable={false}
        onClose={() => actionModal(STATUS.NO)}
        open={status_modal === STATUS.CREATE_PROJECT}
        width="40vw"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <div className="mb-2">Title</div>
            <Input
              name="title"
              value={formik.values.title}
              onChange={onChangeText}
            />
          </div>

          <div className="mb-3">
            <div className="mb-2">Description</div>
            <TextArea
              name="description"
              value={formik.values.description}
              onChange={onChangeText}
              rows={5}
            />
          </div>

          <div className="flex">
            <div className="mb-3 mr-5">
              <div className="mb-2">Start Time</div>
              <DatePicker
                showTime
                format="DD-MM-YYYY HH:mm"
                value={dayjs(formik.values.start_time)}
                onChange={(v) => onChangeDate('start_time', v)}
                onOk={(v) => onChangeDate('start_time', v)}
              />
            </div>

            <div className="mb-3 ml-5">
              <div className="mb-2">End Time</div>
              <DatePicker
                showTime
                format="DD-MM-YYYY HH:mm"
                value={dayjs(formik.values.end_time)}
                onChange={(v) => onChangeDate('end_time', v)}
                onOk={(v) => onChangeDate('end_time', v)}
              />
            </div>
          </div>

          <Button className="my-3" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </form>
      </Drawer>
    </div>
  );
};
