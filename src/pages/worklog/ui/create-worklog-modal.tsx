import { Button, Drawer, Input, message, Select } from 'antd';
import { useFormik } from 'formik';
import TextArea from 'antd/es/input/TextArea';

import { useAppDispatch, useAppSelector } from '@/stores';
import { Project } from '@/entities/project/model';
import { STATUS } from '@/shared/configs/constants';
import { setStatusModal } from '@/stores/store';
import { useCreateWorkLog, useUpdateWorkLog } from '@/features/work-log';
import { Progress } from '@/entities/progress/model';

type Props = {
  projects: Project[];
  progresses: Progress[];
  refetchWorkLogs: () => void;
};

interface Values {
  title: string;
  description: string;
  actual_time: number;
  progress_id: string;
  sub_task_id: string;
  project_id: string;
}

export const CreateWorkLogModal = ({ progresses, refetchWorkLogs }: Props) => {
  const createWorkLog = useCreateWorkLog();
  const updateWorkLog = useUpdateWorkLog();

  const { status_modal, work_log } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const isCreate = status_modal === STATUS.CREATE_WORK_LOG;
  const isUpdate = status_modal === STATUS.UPDATE_WORK_LOG;
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      title: work_log.title || '',
      description: work_log.description || '',
      actual_time: work_log.actual_time || 0,
      sub_task_id: work_log.sub_task_id || '',
      project_id: work_log.project_id || '',
      progress_id: work_log.progress_id || ''
    },
    onSubmit: async (values) => {
      const methodText = isUpdate ? 'Update' : 'Create';

      if (isCreate) {
        await createWorkLog.mutateAsync({
          sub_task_id: values.sub_task_id,
          title: values.title,
          description: values.description,
          actual_time: values.actual_time,
          progress_id: values.progress_id
        });
      } else {
        await updateWorkLog.mutateAsync({
          id: work_log.id,
          sub_task_id: values.sub_task_id,
          title: values.title,
          description: values.description,
          actual_time: values.actual_time,
          progress_id: values.progress_id
        });
      }

      formik.resetForm({});
      message.success(`${methodText} Worklog Success!`);
      refetchWorkLogs();
      actionModal(STATUS.NO);
    }
  });

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    formik.setFieldValue(name, value);
  };

  const onChangeSelect = (v: string) => {
    formik.setFieldValue('progress_id', v);
  };

  return (
    <div>
      <>
        <Drawer
          title={`${isCreate ? 'Create' : 'Update'} a worklog`}
          width="40vw"
          onClose={() => actionModal(STATUS.NO)}
          open={isCreate || isUpdate}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="">
              <div>
                <div className="mb-5">
                  <div className="mb-2">Title</div>
                  <Input
                    name="title"
                    value={formik.values.title}
                    onChange={onChangeText}
                  />
                </div>
                <div className="mb-5">
                  <div className="mb-2">Estimated time</div>
                  <Input
                    type="number"
                    name="actual_time"
                    value={formik.values.actual_time}
                    onChange={onChangeText}
                  />
                </div>

                <div className="mb-5">
                  <div className="mb-2">Status</div>
                  <Select
                    showSearch
                    className="w-full"
                    placeholder={`Search to position`}
                    optionFilterProp="children"
                    value={
                      progresses.find(
                        (item) => item.id === formik.values.progress_id
                      )?.name
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
                    onChange={onChangeSelect}
                  />
                </div>

                <div className="mb-5">
                  <div className="mb-2">Notes</div>
                  <TextArea
                    name="description"
                    value={formik.values.description}
                    onChange={onChangeText}
                    rows={5}
                  />
                </div>

                <Button htmlType="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Drawer>
      </>
    </div>
  );
};
