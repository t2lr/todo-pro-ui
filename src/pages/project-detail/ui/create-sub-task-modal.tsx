import { Button, DatePicker, Drawer, Input, message, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '@/stores';

import { setStatusModal } from '@/stores/store';
import { STATUS } from '@/shared/configs/constants';
import { useCreateSubTask, useUpdateSubTask } from '@/features/sub-task';
import { Project } from '@/entities/project/model';
import { Nullable } from '@/shared/types';
import { Priority } from '@/entities/priority/model';
import { Progress } from '@/entities/progress/model';
import { Category } from '@/entities/category/model';
import { Phase } from '@/entities/phase/model';

type Props = {
  title: string;
  project: Project;
  priorities: Priority[];
  progresses: Progress[];
  categories: Category[];
  phases: Phase[];
  refetchProjectDetail: () => void;
};

interface Values {
  title: string;
  description: string;
  estimated_time: number;
  phase_id: string;
  category_id: string;
  progress_id: string;
  priority_id: string;
  assignment_id: Nullable<string>;
  start_date: Date;
  deadline: Date;
}

export const CreareSubTaskModal = ({
  title,
  project,
  priorities,
  categories,
  progresses,
  phases,
  refetchProjectDetail
}: Props) => {
  const createSubTask = useCreateSubTask();
  const updateSubTask = useUpdateSubTask();
  const dispatch = useAppDispatch();

  const { task, status_modal, sub_task } = useAppSelector(
    (state) => state.project
  );
  const isUpdate = status_modal === STATUS.UPDATE_SUB_TASK;
  const isCreate = status_modal === STATUS.CREATE_SUB_TASK;
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      title: isUpdate ? sub_task?.title : '',
      description: isUpdate ? sub_task?.description : '',
      assignment_id: isUpdate ? sub_task?.assignment.id : null,
      phase_id: isUpdate ? sub_task?.phase?.id : '',
      category_id: isUpdate ? sub_task?.category.id : '',
      progress_id: isUpdate ? sub_task?.progress.id : '',
      priority_id: isUpdate ? sub_task?.priority.id : '',
      estimated_time: isUpdate ? sub_task?.estimated_time : 0,
      start_date: sub_task?.start_date,
      deadline: sub_task?.deadline
    },
    onSubmit: async (values) => {
      const methodText = isUpdate ? 'Update' : 'Create';
      console.log(values, 'values');
      if (!isUpdate) {
        await createSubTask.mutateAsync({
          project_id: project.id,
          user_story_id: task.user_story_id,
          use_case_id: task.use_case_id,
          task_id: task.id,
          ...values
        });
      } else {
        await updateSubTask.mutateAsync({
          project_id: project.id,
          id: sub_task.id,
          user_story_id: sub_task.user_story_id,
          use_case_id: sub_task.use_case_id,
          task_id: sub_task.task_id,
          ...values
        });
      }

      formik.resetForm({});
      message.success(`${methodText} Sub Task Success!`);
      refetchProjectDetail();
      actionModal(STATUS.NO);
    }
  });

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const onChangeDate = (name: string, date: Dayjs): void => {
    formik.setFieldValue(name, dayjs(date).format());
    console.log(name, dayjs(date).format());
  };

  const onChangeSelect = (value: string, name: string): void => {
    if (name === 'assignment_id') {
      const [username, position] = value.split('-');
      const assignment = project.assignments.find(
        (assignment) =>
          assignment.position === position &&
          assignment.user?.username === username
      );

      formik.setFieldValue(name, assignment!.id);
    }
    if (name === 'progress_id') {
      const progress = progresses.find((item) => item.name === value);
      formik.setFieldValue(name, progress?.id);
    }
    if (name === 'category_id') {
      const category = categories.find((item) => item.name === value);
      formik.setFieldValue(name, category?.id);
    }
    if (name === 'phase_id') {
      const phase = phases.find((item) => item.name === value);
      formik.setFieldValue(name, phase?.id);
    }
    if (name === 'priority_id') {
      const priority = priorities.find((item) => item.name === value);
      formik.setFieldValue(name, priority?.id);
    }
  };

  return (
    <div className="">
      <Drawer
        title={`${isUpdate ? 'Update' : 'Create'} ${title}`}
        open={isUpdate || isCreate}
        closable={false}
        onClose={() => actionModal(STATUS.NO)}
        width="45vw"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <div className="mb-2">Title</div>
            <Input
              name="title"
              value={formik.values.title}
              onChange={onChangeText}
            />
          </div>

          <div className="mb-5">
            <div className="mb-2">Description</div>
            <TextArea
              name="description"
              value={formik.values.description}
              onChange={onChangeText}
              rows={5}
            />
          </div>

          <div className="mb-5">
            <div className="mb-2">Position</div>
            <Select
              showSearch
              className="w-full"
              placeholder={`Search to position`}
              optionFilterProp="children"
              value={
                project.assignments?.find(
                  (item) => item.id === formik.values.assignment_id
                )?.user?.username
              }
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={project.assignments?.flatMap((assignment) => ({
                label: `${assignment.user?.username}-${assignment.position}`,
                value: `${assignment.user?.username}-${assignment.position}`
              }))}
              onChange={(e) => onChangeSelect(e, 'assignment_id')}
            />
          </div>

          <div className="mb-5 flex flex-wrap gap-5">
            <div className="">
              <div className="mb-2">Phases</div>
              <Select
                showSearch
                placeholder={`Search to position`}
                optionFilterProp="children"
                value={
                  phases.find((item) => item.id === formik.values.phase_id)
                    ?.name
                }
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={phases?.flatMap((item) => ({
                  label: item.name,
                  value: item.name
                }))}
                onChange={(e) => onChangeSelect(e, 'phase_id')}
              />
            </div>
            <div className="">
              <div className="mb-2">Category</div>
              <Select
                showSearch
                placeholder={`Search to position`}
                optionFilterProp="children"
                value={
                  categories.find(
                    (item) => item.id === formik.values.category_id
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
                options={categories?.flatMap((item) => ({
                  label: item.name,
                  value: item.name
                }))}
                onChange={(e) => onChangeSelect(e, 'category_id')}
              />
            </div>
            <div className="">
              <div className="mb-2">Priority</div>
              <Select
                showSearch
                placeholder={`Search to position`}
                optionFilterProp="children"
                value={
                  priorities.find(
                    (item) => item.id === formik.values.priority_id
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
                options={priorities?.flatMap((item) => ({
                  label: item.name,
                  value: item.name
                }))}
                onChange={(e) => onChangeSelect(e, 'priority_id')}
              />
            </div>
            <div className="">
              <div className="mb-2">Progress</div>
              <Select
                showSearch
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
                options={progresses?.flatMap((item) => ({
                  label: item.name,
                  value: item.name
                }))}
                onChange={(e) => onChangeSelect(e, 'progress_id')}
              />
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2">Estimated time</div>
            <Input
              type="number"
              name="estimated_time"
              value={formik.values.estimated_time}
              onChange={onChangeText}
            />
          </div>

          <div className="mb-5">
            <div className="mb-2">Deadline</div>
            <DatePicker
              showTime
              format="DD-MM-YYYY HH:mm"
              value={dayjs(formik.values.deadline)}
              onChange={(v) => onChangeDate('deadline', v)}
              onOk={(v) => onChangeDate('deadline', v)}
            />
          </div>

          <div className="mb-3 mr-5">
            <div className="mb-2">Start Date</div>
            <DatePicker
              showTime
              format="DD-MM-YYYY HH:mm"
              value={dayjs(formik.values.start_date)}
              onChange={(v) => onChangeDate('start_date', v)}
              onOk={(v) => onChangeDate('start_date', v)}
            />
          </div>

          <Button className="my-3" htmlType="submit" loading={false}>
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </form>
      </Drawer>
    </div>
  );
};
