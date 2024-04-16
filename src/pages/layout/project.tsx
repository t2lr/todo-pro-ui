import { STATUS } from '@/shared/configs/constants';
import { setStatusModal } from '@/stores/store';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';

export const Project = () => {
  const dispatch = useDispatch();

  const actionAddProject = () => {
    dispatch(setStatusModal(STATUS.CREATE_PROJECT));
  };

  return (
    <div>
      <Input
        placeholder="Search project ..."
        addonAfter={
          <PlusOutlined className="cursor-pointer" onClick={actionAddProject} />
        }
        style={{ width: 200, padding: '15px' }}
      />
    </div>
  );
};
