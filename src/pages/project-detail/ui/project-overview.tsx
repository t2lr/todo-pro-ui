import { Project } from '@/entities/project/model';
import { STATUS } from '@/shared/configs/constants';
import { setStatusModal } from '@/stores/store';
import {
  FieldTimeOutlined,
  FileTextOutlined,
  PlusOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import { Divider, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

type Props = {
  project: Project;
};

export const ProjectOverview = ({ project }: Props) => {
  const dispatch = useDispatch();
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  return (
    <div className="">
      <div className="">
        <div className="project-detail-title my-2">
          <ProjectOutlined className="mr-2" />
          Project Roles
        </div>
        <div className="flex gap-4 mx-2">
          <Tooltip title="Add Member" placement="top" className="text-center">
            <div
              onClick={() => actionModal(STATUS.UPDATE_PROJECT)}
              className="project-detail-overview-member"
            >
              <PlusOutlined className="" style={{ fontSize: '150%' }} />
            </div>
          </Tooltip>

          {project.assignments.map((assignment) => (
            <Tooltip
              key={assignment.id}
              title={`${assignment.user?.username} - ${assignment.position}`}
              placement="top"
              className="text-center"
            >
              <img
                className="project-detail-overview-avatar"
                src={assignment.user?.src}
                alt={assignment.user?.username}
              />
              <div className="">{assignment.position}</div>
            </Tooltip>
          ))}
        </div>
      </div>
      <Divider />
      <div className="project-detail-overview-deadline">
        <div className="project-detail-title">
          <ProjectOutlined className="mr-2" /> Deadline
        </div>
        <div className="">
          <div className="flex">
            <div className="flex mb-3">
              <FieldTimeOutlined className="cursor-pointer" />
              <div className="mx-2">Start time : </div>
              <b>{dayjs(project?.start_time).format('DD-MM-YYYY HH:mm')}</b>
            </div>
          </div>
          <div className="flex">
            <FieldTimeOutlined className="" />
            <div className="mx-2">End time : </div>
            <b>{dayjs(project.start_time).format('DD-MM-YYYY HH:mm')}</b>
          </div>
        </div>
      </div>
      <Divider />
      <div className="project-detail-overview-description">
        <div className="project-detail-title">
          <FileTextOutlined /> Description
        </div>
        <div className="text-justify">{project?.description}</div>
      </div>
    </div>
  );
};
