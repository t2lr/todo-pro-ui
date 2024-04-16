import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import TextArea from 'antd/es/input/TextArea';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  DatePicker,
  Drawer,
  Input,
  Select,
  Upload,
  message
} from 'antd';

import { Assignment } from '@/entities/assignments/model';
import { Project } from '@/entities/project/model';
import { User } from '@/entities/user/model';
import { useCreateAssignmentList } from '@/features/assignment';
import { useUpdateProject } from '@/features/project';
import { STATUS, POSITION } from '@/shared/configs/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/stores';
import { setStatusModal } from '@/stores/store';
import { useUploadFile } from '@/features/upload-file';
import { Nullable } from '@/shared/types';

type Props = {
  project: Project;
  users: User[];
  refetchProjectDetail: () => void;
};

interface Values {
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  src: Nullable<string>;
}

export const UpdateProjectModal = ({
  project,
  users,
  refetchProjectDetail
}: Props) => {
  const useProject = useUpdateProject();
  const useAssignmentList = useCreateAssignmentList();
  const useUpload = useUploadFile();

  const [childrenDrawer, setChildrenDrawer] = useState<boolean>(false);
  const [position, setPosition] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const dispatch = useDispatch();
  const { status_modal } = useSelector((state: AppState) => state.project);

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      title: project?.title,
      description: project?.description,
      start_time: project?.start_time,
      end_time: project?.end_time,
      src: project?.src
    },
    onSubmit: async (values) => {
      await useAssignmentList.mutateAsync({
        project_id: project.id,
        assignments: assignments.flatMap((assignment) => ({
          id: assignment.id,
          user_id: assignment.user_id,
          project_id: project.id,
          position: assignment.position
        }))
      });

      await useProject.mutateAsync({
        id: project.id,
        title: values.title,
        src: values.src,
        description: values.description,
        start_time: values.start_time,
        end_time: values.end_time
      });

      refetchProjectDetail();
      actionModal(STATUS.NO);
      message.success('Update Project Success!');
    }
  });

  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const onChangeDate = (name: string, date: Dayjs): void => {
    formik.setFieldValue(name, dayjs(date).format());
  };

  const onChangeSelect = (value: string): void => setUsername(value);

  const getPositions = (position: string): Assignment[] =>
    assignments?.filter((assignment) => assignment.position === position);

  const openDrawer = (v: string): void => {
    setPosition(v);
    setChildrenDrawer(true);
  };

  const addMember = (): void => {
    setChildrenDrawer(false);

    const user = users.find((user) => user.username === username)!;
    const result = [...assignments];
    result.push({
      id: uuidv4(),
      project_id: project.id,
      position,
      user_id: user.id,
      user
    });
    setAssignments(result);
  };

  const removeAssignMent = (id: string): void => {
    const index = assignments.findIndex((assignment) => assignment.id === id);

    if (index !== -1) {
      const result = [...assignments];
      result.splice(index, 1);
      setAssignments(result);
    }
  };

  useEffect(() => {
    const assignments = project?.assignments?.flatMap((assignment) => ({
      id: assignment.id,
      project_id: project.id,
      position: assignment.position,
      user_id: assignment!.user!.id,
      user: assignment.user
    }));

    setAssignments(assignments);
  }, [project]);

  return (
    <div className="">
      <Drawer
        title={formik.values?.title}
        closable={false}
        onClose={() => actionModal(STATUS.NO)}
        open={status_modal === STATUS.UPDATE_PROJECT}
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

          <div className="mb-3">
            <div className="mb-2">Avatar</div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={async (file) => {
                const formData = new FormData();
                formData.append('file', file.file as Blob, file.filename);
                const data = await useUpload.mutateAsync(formData);
                formik.setFieldValue('src', data?.src);
              }}
            >
              {formik.values.src ? (
                <img
                  src={formik.values.src}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (
                'Upload'
              )}
            </Upload>
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

          <h1 className="">Team Developer</h1>
          <div className="my-3">
            <div className="mb-5 flex" style={{ justifyContent: 'left' }}>
              <div
                className="team-project-item"
                onClick={() => openDrawer(POSITION.PM)}
              >
                <PlusOutlined className="team-project-item-add" />
                <div className="">{POSITION.PM}</div>
              </div>
              {getPositions(POSITION.PM)?.map((assignment) => (
                <div
                  className="team-project-item-card mx-2"
                  key={assignment.id}
                >
                  <CloseOutlined
                    className="team-project-item-icon"
                    onClick={() => removeAssignMent(assignment.id)}
                  />
                  <img
                    className="team-project-item-avatar rounded-full"
                    src={assignment!.user!.src}
                    alt={assignment!.user!.username}
                  />
                </div>
              ))}
            </div>
            <div className="mb-5 flex" style={{ justifyContent: 'left' }}>
              <div
                className="team-project-item"
                onClick={() => openDrawer(POSITION.BE)}
              >
                <PlusOutlined className="team-project-item-add" />
                <div className="">{POSITION.BE}</div>
              </div>
              {getPositions(POSITION.BE)?.map((assignment) => (
                <div
                  className="team-project-item-card mx-2"
                  key={assignment.id}
                >
                  <CloseOutlined
                    className="team-project-item-icon"
                    onClick={() => removeAssignMent(assignment.id)}
                  />
                  <img
                    className="team-project-item-avatar rounded-full"
                    src={assignment!.user!.src}
                    alt={assignment!.user!.username}
                  />
                </div>
              ))}
            </div>
            <div className="mb-5 flex" style={{ justifyContent: 'left' }}>
              <div
                className="team-project-item"
                onClick={() => openDrawer(POSITION.FE)}
              >
                <PlusOutlined className="team-project-item-add" />
                <div className="">{POSITION.FE}</div>
              </div>
              {getPositions(POSITION.FE)?.map((assignment) => (
                <div
                  className="team-project-item-card mx-2"
                  key={assignment.id}
                >
                  <CloseOutlined
                    className="team-project-item-icon"
                    onClick={() => removeAssignMent(assignment.id)}
                  />
                  <img
                    className="team-project-item-avatar rounded-full"
                    src={assignment!.user!.src}
                    alt={assignment!.user!.username}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            className="my-3"
            htmlType="submit"
            loading={useProject.isPending}
          >
            Submit
          </Button>

          <Drawer
            title={`Add Member To ${position}`}
            width="25vw"
            closable={false}
            onClose={() => setChildrenDrawer(false)}
            open={childrenDrawer}
          >
            <div className="mb-3 flex">
              <Button className="mx-3" onClick={addMember}>
                Add
              </Button>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder={`Search to ${position}`}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={users?.flatMap((user) => ({
                  label: user.username,
                  value: user.username
                }))}
                onChange={onChangeSelect}
              />
            </div>
          </Drawer>
        </form>
      </Drawer>
    </div>
  );
};
