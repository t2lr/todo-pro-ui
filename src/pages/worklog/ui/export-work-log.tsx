import { STATUS } from '@/shared/configs/constants';
import { useAppDispatch } from '@/stores';
import { setStatusModal } from '@/stores/store';
import { Button } from 'antd';

export const ExportWorkLog = () => {
  const dispatch = useAppDispatch();
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  return (
    <div className="flex">
      <Button onClick={() => actionModal(STATUS.CREATE_WORK_LOG)}>
        Add WorkLog
      </Button>
      <Button type="primary">Export</Button>
    </div>
  );
};
