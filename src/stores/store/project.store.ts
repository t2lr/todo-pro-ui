import { ProjectPaginationDto } from '@/entities/project/dto';
import { SubTaskResDto } from '@/entities/sub-task/dto';
import { TaskResDto } from '@/entities/task/dto';
import { UseCaseResDto } from '@/entities/use-case/dto';
import { UserStoryResDto } from '@/entities/user-story/dto';
import { WorkLogResDto } from '@/entities/work-log/dto';
import { STATUS } from '@/shared/configs/constants';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status_modal: STATUS.NO,
  status_sub_task: false,
  activeTabList: '1',
  projectsList: {
    projects: [],
    pageIndex: 1,
    pageSize: 10,
    total: 10
  },
  user_story: {
    id: '',
    title: '',
    description: ''
  },
  use_case: {
    id: '',
    title: '',
    description: '',
    user_story_id: '',
    estimated_time: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  task: {
    id: '',
    title: '',
    description: '',
    use_case_id: '',
    user_story_id: '',
    project_id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    sub_tasks: []
  },
  sub_task: {
    id: '',
    title: '',
    description: '',
    estimated_time: 0,
    commentCount: 0,
    task_id: '',
    use_case_id: '',
    user_story_id: '',
    assignment: {
      id: '',
      position: '',
      user: {
        username: ''
      }
    },
    category: {
      id: '',
      position: 0,
      name: ''
    },
    progress: {
      id: '',
      position: 0,
      name: ''
    },
    priority: {
      id: '',
      position: 0,
      name: ''
    },
    phase: {
      id: '',
      position: 0,
      name: ''
    },
    start_date: new Date(),
    deadline: new Date()
  },
  work_log: {
    id: '',
    title: '',
    description: '',
    actual_time: 0,
    sub_task_id: '',
    project_id: '',
    progress_id: ''
  },
  active_user_stories_list: [],
  active_use_case_list: []
};

const projectSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatusModal: (state, action: PayloadAction<STATUS>) => {
      Object.assign(state, { status_modal: action.payload });
    },
    setActiveTabList: (state, action: PayloadAction<string>) => {
      Object.assign(state, { activeTabList: action.payload });
    },
    setProjectsList: (state, action: PayloadAction<ProjectPaginationDto>) => {
      Object.assign(state, { projectsList: action.payload });
    },
    setActionUserStory: (
      state,
      action: PayloadAction<{ data: UserStoryResDto; status: STATUS }>
    ) => {
      const { data, status } = action.payload;

      Object.assign(state, {
        user_story: data,
        status_modal: status
      });
    },
    setActionUseCase: (
      state,
      action: PayloadAction<{ data: UseCaseResDto; status: STATUS }>
    ) => {
      const { data, status } = action.payload;

      Object.assign(state, {
        use_case: data,
        status_modal: status
      });
    },
    setActionTask: (
      state,
      action: PayloadAction<{ data: TaskResDto; status: STATUS }>
    ) => {
      const { data, status } = action.payload;

      Object.assign(state, {
        task: {
          ...state.task,
          ...data
        },
        status_modal: status
      });
    },
    setActionSubTask: (
      state,
      action: PayloadAction<{ data: SubTaskResDto; status: STATUS }>
    ) => {
      const { data, status } = action.payload;

      Object.assign(state, { sub_task: data, status_modal: status });
    },
    setActionWorkLog: (
      state,
      action: PayloadAction<{ data: WorkLogResDto; status: STATUS }>
    ) => {
      const { data, status } = action.payload;

      Object.assign(state, { work_log: data, status_modal: status });
    },
    setActiveList: (
      state,
      action: PayloadAction<{ data: string[]; status: STATUS }>
    ) => {
      const { data, status } = action.payload;
      if (status === STATUS.USER_STORY) {
        Object.assign(state, { active_user_stories_list: data });
      }
      if (status === STATUS.USE_CASE) {
        Object.assign(state, { active_use_case_list: data });
      }
    },
    setActionStatusSubTask: (state, action: PayloadAction<boolean>) => {
      console.log('status_sub_task');
      Object.assign(state, { status_sub_task: action.payload });
    }
  }
});

export const {
  setStatusModal,
  setProjectsList,
  setActionUserStory,
  setActionUseCase,
  setActionTask,
  setActionSubTask,
  setActiveTabList,
  setActiveList,
  setActionWorkLog,
  setActionStatusSubTask
} = projectSlice.actions;

export default projectSlice.reducer;
