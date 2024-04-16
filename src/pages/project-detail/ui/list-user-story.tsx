import { Project } from '@/entities/project/model';
import { UseCase } from '@/entities/use-case/model';
import { UserStory } from '@/entities/user-story/model';
import { useDeleteUseCase } from '@/features/use-case/delete-use-case';
import { useDeleteUserStory } from '@/features/user-story/delete-user-story';
import { STATUS } from '@/shared/configs/constants';
import { useAppDispatch, useAppSelector } from '@/stores';
import { setStatusModal } from '@/stores/store';
import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  FieldTimeOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { MouseEvent } from 'react';
import { useParams } from 'react-router';
import { Collapse } from 'antd';
import { UseMutationResult } from '@tanstack/react-query';

import {
  setActionUserStory,
  setActionSubTask,
  setActionTask,
  setActionUseCase,
  setActiveList,
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

export const ListUserStory = ({ project, refetchProjectDetail }: Props) => {
  const deleteUserStory = useDeleteUserStory();
  const deleteUseCase = useDeleteUseCase();
  const deleteTask = useDeleteTask();
  const deleteSubTask = useDeleteSubTask();

  const param = useParams();
  const dispatch = useAppDispatch();
  const {
    use_case,
    task,
    active_use_case_list,
    active_user_stories_list,
    status_sub_task
  } = useAppSelector((state) => state.project);

  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));
  const actionActiveList = (value: string[], status: STATUS) =>
    dispatch(setActiveList({ data: value, status }));

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
    } else {
      dispatch(setActionStatusSubTask(true));
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
      STATUS.DELETE_SUB_TASK
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

  const handleExtraUserStoryOrUseCaseUi = (
    action: STATUS,
    data: UserStory | UseCase,
    id_fk: string
  ) => {
    const valueUpdate =
      action === STATUS.USER_STORY
        ? STATUS.UPDATE_USER_STORY
        : STATUS.UPDATE_USE_CASE;

    const valueDelete =
      action === STATUS.USER_STORY
        ? STATUS.DELETE_USER_STORY
        : STATUS.DELETE_USE_CASE;

    return (
      <>
        <EditOutlined
          className="mx-2"
          onClick={(event: MouseEvent<HTMLButtonElement>) =>
            handleCommandForEntities(event, valueUpdate, data, id_fk)
          }
        />
        <DeleteOutlined
          className="mx-2"
          onClick={(event: MouseEvent<HTMLButtonElement>) =>
            handleCommandForEntities(event, valueDelete, data, id_fk)
          }
        />
      </>
    );
  };

  const handleTitleUI = (type: STATUS, data: UserStory | UseCase) => {
    if (type === STATUS.USER_STORY) {
      return <div className="">{data.title}</div>;
    }

    if (type === STATUS.USE_CASE) {
      return (
        <div className="">
          <b className="mr-2">
            <FieldTimeOutlined className="mr-1" />
            {(data as UseCase).estimated_time}h
          </b>
          {data.title}
        </div>
      );
    }
  };

  const handleAddUseCaseOrTaskUI = (
    action: STATUS,
    data: UseCase | Task,
    id_fk: string
  ) => {
    const value =
      action === STATUS.CREATE_USE_CASE
        ? STATUS.CREATE_USE_CASE
        : STATUS.CREATE_TASK;
    const message =
      action === STATUS.CREATE_USE_CASE ? 'Add use case ...' : 'Add task ...';

    return (
      <div
        className="user-case-add"
        onClick={(event: MouseEvent<HTMLDivElement>) => {
          handleCommandForEntities(
            event,
            value,
            { ...(data as UseCase) },
            id_fk
          );
          actionModal(value);
        }}
      >
        {message}
      </div>
    );
  };

  const userStories: any = project?.user_stories.flatMap((user_story) => ({
    key: user_story.id,
    label: handleTitleUI(STATUS.USER_STORY, user_story),
    children: (
      <>
        <Collapse
          style={{ backgroundColor: 'transparent' }}
          bordered={false}
          onChange={(e) => actionActiveList(e as string[], STATUS.USE_CASE)}
          defaultActiveKey={active_use_case_list}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          items={user_story.use_cases.flatMap((use_case) => ({
            key: use_case.id,
            label: handleTitleUI(STATUS.USE_CASE, use_case),
            children: (
              <div className="pl-1">
                <div className="">
                  {use_case.tasks!.map((item) => (
                    <div
                      key={use_case.id}
                      className="cursor-pointer flex justify-between"
                      style={{
                        padding: '12px 16px',
                        marginBottom: '8px',
                        borderBottom: '1px solid rgb(239 232 232)',
                        background:
                          item.id === task.id ? 'rgb(211 208 208)' : ''
                      }}
                      onClick={() => {
                        console.log(item);
                        actionTask(
                          {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            user_story_id: user_story.id,
                            use_case_id: use_case.id,
                            sub_tasks: item.sub_tasks
                          },
                          STATUS.GET_TASK
                        );
                      }}
                    >
                      <div className="">
                        <HistoryOutlined className="mx-2" />
                        {item.title}
                      </div>
                      <div className="">
                        <EditOutlined
                          className="mx-2"
                          style={{ fontSize: '110%' }}
                          onClick={(event: MouseEvent<HTMLDivElement>) => {
                            handleCommandForEntities(
                              event,
                              STATUS.UPDATE_TASK,
                              {
                                ...task,
                                user_story_id: user_story.id,
                                use_case_id: use_case.id
                              },
                              task.id
                            );
                            actionModal(STATUS.UPDATE_TASK);
                          }}
                        />
                        <DeleteOutlined
                          className="mx-2"
                          style={{ fontSize: '110%' }}
                          onClick={(event: MouseEvent<HTMLDivElement>) => {
                            handleCommandForEntities(
                              event,
                              STATUS.DELETE_TASK,
                              {
                                ...item,
                                user_story_id: user_story.id,
                                use_case_id: use_case.id
                              },
                              task.id
                            );
                            event.stopPropagation();
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {handleAddUseCaseOrTaskUI(
                  STATUS.CREATE_TASK,
                  task,
                  use_case.id
                )}
              </div>
            ),
            extra: handleExtraUserStoryOrUseCaseUi(
              STATUS.USE_CASE,
              use_case,
              user_story.id
            )
          }))}
        />
        {handleAddUseCaseOrTaskUI(
          STATUS.CREATE_USE_CASE,
          { ...use_case, project_id: project.id },
          user_story.id
        )}
      </>
    ),
    extra: handleExtraUserStoryOrUseCaseUi(STATUS.USER_STORY, user_story, '')
  }));

  return (
    <div
      className="user-stories-item"
      style={{
        minWidth: status_sub_task ? '50%' : '100%'
      }}
    >
      <Collapse
        className="mb-5"
        bordered={false}
        onChange={(e) => actionActiveList(e as string[], STATUS.USER_STORY)}
        defaultActiveKey={active_user_stories_list}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={userStories}
      />
    </div>
  );
};
