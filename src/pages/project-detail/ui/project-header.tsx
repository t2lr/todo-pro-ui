import { Assignment } from '@/entities/assignments/model';
import { Project } from '@/entities/project/model';
import { STATUS } from '@/shared/configs/constants';
import { setStatusModal } from '@/stores/store';
import {
  AppstoreAddOutlined,
  DownOutlined,
  EditOutlined,
  StarOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useDispatch } from 'react-redux';

type Props = {
  project: Project;
  assignments: Assignment[];
};

export const ProjectHeader = ({ assignments, project }: Props) => {
  const dispatch = useDispatch();

  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  return (
    <div className="flex justify-between mb-2">
      <div className="flex items-center">
        <img className="project-detail-avatar" src={project.src!} alt="" />
        <div className="project-detail-header">{project.title}</div>
        <DownOutlined
          style={{ fontSize: '150%' }}
          className="mx-2 cursor-pointer"
        />
        <StarOutlined
          style={{ fontSize: '150%' }}
          className="mx-2 cursor-pointer"
        />
        <Tooltip title="Edit Project" placement="top" className="text-center">
          <EditOutlined
            style={{ fontSize: '150%' }}
            className="mx-2 cursor-pointer"
            onClick={() => actionModal(STATUS.UPDATE_PROJECT)}
          />
        </Tooltip>
        <Tooltip title="Add User Story" placement="top" className="text-center">
          <AppstoreAddOutlined
            style={{ fontSize: '150%' }}
            className="mx-2 cursor-pointer"
            onClick={() => actionModal(STATUS.CREATE_USER_STORY)}
          />
        </Tooltip>
      </div>
      <div className="flex items-center mx-2">
        {assignments.map((assignment: Assignment) => (
          <Tooltip
            key={assignment.id}
            title={`${assignment?.user?.username} - ${assignment.position}`}
            placement="top"
          >
            <img
              className="project-detail-assignment-avatar"
              src={assignment?.user?.src}
              alt={assignment?.user?.username}
            />
          </Tooltip>
        ))}
        <div>
          <UsergroupAddOutlined
            className="project-detail-add-member"
            onClick={() => actionModal(STATUS.UPDATE_PROJECT)}
          />
        </div>
      </div>
    </div>
  );
};
