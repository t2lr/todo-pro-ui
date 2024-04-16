import dayjs from 'dayjs';

export const Today = () => {
  return (
    <div className="my-2">
      <b>Today</b>: {dayjs(new Date()).format('HH:mm')} hrs
    </div>
  );
};
