import { Avatar, Button, Divider, Drawer, Form, Tooltip } from 'antd';
import { Comment, Icon } from '@ant-design/compatible';

import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '@/stores';

import { setStatusModal } from '@/stores/store';
import { STATUS } from '@/shared/configs/constants';
import { useCreateSubTask, useUpdateSubTask } from '@/features/sub-task';
import { Project } from '@/entities/project/model';
import { Priority } from '@/entities/priority/model';
import { Progress } from '@/entities/progress/model';
import { Category } from '@/entities/category/model';
import { Phase } from '@/entities/phase/model';
import useAuth from '@/hooks/useAuth';
import { useCreateComment, useUpdateComment } from '@/features/comment';
import { SubTask } from '@/entities/sub-task/model';
import { CommentResDto } from '@/entities/comment/dto';

type Props = {
  title: string;
  project: Project;
  priorities: Priority[];
  progresses: Progress[];
  categories: Category[];
  phases: Phase[];
  sub_tasks: SubTask;
  refetchProjectDetail: () => void;
  refetchSubTaskDetail: () => void;
};

interface Values {
  content: string;
}

export const ViewSubTaskModal = ({
  project,
  priorities,
  categories,
  progresses,
  phases,
  sub_task,
  refetchSubTaskDetail,
  refetchProjectDetail
}: Props) => {
  const { src, username } = useAuth();

  const createComment = useCreateComment();
  const updateComment = useUpdateComment();
  const dispatch = useAppDispatch();

  const { status_modal } = useAppSelector((state) => state.project);
  const isView = status_modal === STATUS.VIEW_SUB_TASK;
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      content: ''
    },
    onSubmit: async (values) => {
      await createComment.mutateAsync({
        sub_task_id: sub_task.id,
        content: values.content
      });
      formik.resetForm({});
      refetchSubTaskDetail();
    }
  });

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <div className="">
      <Drawer
        title={sub_task?.title}
        open={isView}
        closable={false}
        onClose={() => actionModal(STATUS.NO)}
        width="45vw"
      >
        <div className="view-sub-task">
          <div className="view-sub-task-content">
            <div className="my-2">Title : {sub_task?.title}</div>
            <div className="my-2">Description : {sub_task?.description}</div>
            <div className="my-2">
              Assigner : {sub_task?.assignment?.user?.username}
            </div>
            <div className="my-2">
              Estimated time : {sub_task?.estimated_time}
            </div>
            <div className="my-2">
              Deadline : {dayjs(sub_task?.deadline).format('DD/MM/YYYY HH:mm')}
            </div>
          </div>
          <div className="sub-task-comments">
            <div className="sub-task-comments-list">
              {sub_task?.comments?.map((comment: CommentResDto) => (
                <Comment
                  key={comment.id}
                  actions={[]}
                  author={
                    <b>
                      {comment?.user?.username}
                      <span className="mx-2">
                        {dayjs(comment?.createdAt).format('YY-MM-DD HH:mm:ss')}
                      </span>
                    </b>
                  }
                  avatar={
                    <Avatar
                      src={comment?.user?.src}
                      alt={comment?.user?.username}
                    />
                  }
                  content={<p>{comment?.content}</p>}
                  datetime={
                    <Tooltip
                      title={dayjs(comment?.createdAt).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}
                    ></Tooltip>
                  }
                />
              ))}
            </div>
            <Divider className="py-0 my-0" />
            <Comment
              avatar={<Avatar src={src} alt={username!} />}
              content={
                <form onSubmit={formik.handleSubmit}>
                  <TextArea
                    rows={4}
                    name="content"
                    placeholder="Please fill comment ..."
                    onChange={onChangeText}
                  />
                  <Button htmlType="submit" type="primary" className="my-2">
                    Add Comment
                  </Button>
                </form>
              }
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};
