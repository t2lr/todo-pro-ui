import { DatePicker } from 'antd';

export const AddWorkLog = () => {
  return (
    <div className="mb-3 mr-5">
      <DatePicker
        showTime
        format="DD-MM-YYYY"
        onChange={() => {}}
        onOk={() => {}}
      />
    </div>
  );
};
