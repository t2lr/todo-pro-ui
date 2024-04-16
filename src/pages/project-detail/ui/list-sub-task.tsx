import { Project } from '@/entities/project/model';
import { UseCase } from '@/entities/use-case/model';
import { UserStory } from '@/entities/user-story/model';
import { useDeleteUseCase } from '@/features/use-case/delete-use-case';
import { useDeleteUserStory } from '@/features/user-story/delete-user-story';
import { STATUS } from '@/shared/configs/constants';
import { useAppDispatch, useAppSelector } from '@/stores';
import { setStatusModal, setSubTaskDetail } from '@/stores/store';
import {
  AppstoreAddOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HistoryOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { MouseEvent } from 'react';
import { useParams } from 'react-router';
import { Avatar, Descriptions, List, Space, Tag } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import React from 'react';
import dayjs from 'dayjs';
import { UseMutationResult } from '@tanstack/react-query';

import {
  setActionUserStory,
  setActionSubTask,
  setActionTask,
  setActionUseCase,
  setActionStatusSubTask
} from '@/stores/store/project.store';

import { confirmDeleteUserStory } from './delete-user-story-modal';
import { confirmDeleteUseCase } from './delete-use-case-modal';

import { Task } from '@/entities/task/model';
import { confirmDeleteTask } from './delete-task-modal';
import { useDeleteTask } from '@/features/task/delete-task';
import { useDeleteSubTask } from '@/features/sub-task/delete-sub-task';
import { SubTask } from '@/entities/sub-task/model';
import { confirmDeleteSubTask } from './delete-sub-task-modal';

type Props = {
  project: Project;
  refetchProjectDetail: () => void;
};

export const ListSubTask = ({ project, refetchProjectDetail }: Props) => {
  const deleteUserStory = useDeleteUserStory();
  const deleteUseCase = useDeleteUseCase();
  const deleteTask = useDeleteTask();
  const deleteSubTask = useDeleteSubTask();

  const param = useParams();
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.project);

  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));
  const actionStatusSubTask = (status: boolean) =>
    dispatch(setActionStatusSubTask(status));
  const actionSubTaskDetail = (data: any) => dispatch(setSubTaskDetail(data));

  const actionUserStory = (data: UserStory, status: STATUS) => {
    if (status === STATUS.DELETE_USER_STORY) {
      confirmDeleteUserStory(
        param.projectId!,
        data as UserStory,
        deleteUserStory as UseMutationResult,
        refetchProjectDetail
      );
    }
    return dispatch(setActionUserStory({ data, status }));
  };

  const actionUseCase = (data: UseCase, status: STATUS) => {
    if (status === STATUS.DELETE_USE_CASE) {
      confirmDeleteUseCase(
        project.id,
        data,
        deleteUseCase as UseMutationResult,
        refetchProjectDetail
      );
    }
    return dispatch(setActionUseCase({ data, status }));
  };

  const actionTask = (data: any, status: STATUS) => {
    if (status === STATUS.DELETE_TASK) {
      confirmDeleteTask(
        project.id,
        data,
        deleteTask as UseMutationResult,
        refetchProjectDetail
      );
    }
    return dispatch(setActionTask({ data, status }));
  };

  const actionSubTask = (data: any, status: STATUS) => {
    if (status === STATUS.GET_TASK) {
      return dispatch(setActionTask({ data, status }));
    }
    if (status === STATUS.DELETE_SUB_TASK) {
      confirmDeleteSubTask(
        project.id,
        data,
        deleteSubTask as UseMutationResult,
        refetchProjectDetail
      );
    }
    return dispatch(setActionSubTask({ data, status }));
  };

  const getStatusAction = (status: STATUS): string[] => {
    if (status === STATUS.USER_STORY) {
      return [
        STATUS.CREATE_USER_STORY,
        STATUS.UPDATE_USER_STORY,
        STATUS.DELETE_USER_STORY
      ];
    }

    if (status === STATUS.USE_CASE) {
      return [
        STATUS.CREATE_USE_CASE,
        STATUS.UPDATE_USE_CASE,
        STATUS.DELETE_USE_CASE
      ];
    }

    if (status === STATUS.TASK) {
      return [STATUS.CREATE_TASK, STATUS.UPDATE_TASK, STATUS.DELETE_TASK];
    }

    return [
      STATUS.CREATE_SUB_TASK,
      STATUS.UPDATE_SUB_TASK,
      STATUS.DELETE_SUB_TASK,
      STATUS.VIEW_SUB_TASK
    ];
  };

  const handleCommandForEntities = (
    event: MouseEvent<HTMLButtonElement | HTMLDivElement>,
    status: STATUS,
    data: UserStory | UseCase | Task | SubTask,
    id_fk: string
  ): void => {
    const isStatusUserStory: boolean = getStatusAction(
      STATUS.USER_STORY
    ).includes(status);
    const isStatusUseCase: boolean = getStatusAction(STATUS.USE_CASE).includes(
      status
    );
    const isStatusTask: boolean = getStatusAction(STATUS.TASK).includes(status);
    const isStatusSubTask: boolean = getStatusAction(STATUS.SUB_TASK).includes(
      status
    );

    if (isStatusUserStory) {
      const result = { ...(data as UserStory) };
      actionUserStory(result, status);
    }

    if (isStatusUseCase) {
      const result = {
        ...(data as UseCase),
        user_story_id: id_fk
      };
      actionUseCase(result, status);
    }

    if (isStatusTask) {
      const result = {
        ...(data as Task),
        use_case_id: id_fk
      };
      actionTask(result, status);
    }

    if (isStatusSubTask) {
      const result = { ...(data as SubTask), task_id: id_fk };
      actionSubTask(result, status);
    }

    return event.stopPropagation();
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  console.log(task.sub_tasks, 'task.sub_tasks');
  return (
    <div className="user-stories">
      <div className="sub-tasks">
        <Descriptions
          className="px-4 user-stories-description"
          title={task.title}
          extra={
            <>
              <AppstoreAddOutlined
                className="mx-2 cursor-pointer"
                style={{ fontSize: '110%' }}
                onClick={() => actionModal(STATUS.CREATE_SUB_TASK)}
              />
              <CloseCircleOutlined
                className="mx-2 cursor-pointer"
                style={{ fontSize: '120%' }}
                onClick={() => actionStatusSubTask(false)}
              />
            </>
          }
        >
          <Descriptions.Item label={task.description}> </Descriptions.Item>
        </Descriptions>
        <List
          className="mb-5"
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 6
          }}
          dataSource={task.sub_tasks?.map((sub_task: any) => ({
            position: sub_task?.assignment?.position || '',
            estimated_time: sub_task.estimated_time || '',
            deadline:
              dayjs(sub_task.deadline).format('HH:mm DD/MM/YYYY') || new Date(),
            start_date:
              dayjs(sub_task.start_date).format('DD/MM/YYYY') || new Date(),
            title: sub_task.title,
            description: sub_task.description,
            avatar: sub_task?.assignment?.user?.src,
            username: sub_task?.assignment?.user?.username,
            progress: sub_task?.progress?.name,
            sub_task,
            commentCount: sub_task.commentCount,
            totalActualTime: sub_task.work_logs.reduce(
              (sum: number, item: any) => sum + item.actual_time,
              0
            )
          }))}
          footer={null}
          renderItem={(item) => (
            <List.Item
              key={item.sub_task.id}
              actions={[
                <IconText
                  icon={UserOutlined}
                  text={item.username as string}
                  key="list-vertical-message"
                />,
                <IconText
                  icon={FieldTimeOutlined}
                  text={item.start_date as string}
                  key="list-vertical-message"
                />,
                <IconText
                  icon={FieldTimeOutlined}
                  text={`${item.totalActualTime} / ${item.estimated_time} H`}
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text={item.commentCount}
                  key="list-vertical-message"
                />,
                <IconText
                  icon={TeamOutlined}
                  text={item.position}
                  key="list-vertical-message"
                />,
                <IconText
                  icon={HistoryOutlined}
                  text={item.deadline as string}
                  key="list-vertical-message"
                />
              ]}
              extra={
                <>
                  <EyeOutlined
                    style={{ fontSize: '110%' }}
                    className="mx-2 cursor-pointer"
                    onClick={(event: MouseEvent<HTMLDivElement>) => {
                      actionSubTaskDetail({
                        ...item.sub_task,
                        project_id: project.id
                      });

                      handleCommandForEntities(
                        event,
                        STATUS.VIEW_SUB_TASK,
                        {
                          ...item.sub_task,
                          task_id: task.id,
                          use_case_id: task.use_case_id,
                          user_story_id: task.user_story_id,
                          project_id: task.project_id
                        },
                        task.id
                      );
                    }}
                  />
                  <EditOutlined
                    className="mx-2 cursor-pointer"
                    style={{ fontSize: '110%' }}
                    onClick={(event: MouseEvent<HTMLDivElement>) => {
                      handleCommandForEntities(
                        event,
                        STATUS.UPDATE_SUB_TASK,
                        {
                          ...item.sub_task,
                          task_id: task.id,
                          use_case_id: task.use_case_id,
                          user_story_id: task.user_story_id,
                          project_id: task.project_id
                        },
                        task.id
                      );
                    }}
                  />
                  <DeleteOutlined
                    className="mx-2 cursor-pointer"
                    style={{ fontSize: '110%' }}
                    onClick={(event: MouseEvent<HTMLDivElement>) => {
                      handleCommandForEntities(
                        event,
                        STATUS.DELETE_SUB_TASK,
                        {
                          ...item.sub_task,
                          task_id: task.id,
                          use_case_id: task.use_case_id,
                          user_story_id: task.user_story_id,
                          project_id: task.project_id
                        },
                        task.id
                      );
                    }}
                  />
                </>
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={item.description}
              />
              <Tag>{item.progress}</Tag>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
