import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from '../store/global.store';
import tagsViewReducer from '../store/tags-view.store';
import userReducer from '../store/user.store';
import projectReducer from '../store/project.store';
import worklogReducer from '../store/worklog.store';
import subTaskReducer from '../store/sub-task.store';

const rootReducer = combineReducers({
  user: userReducer,
  tagsView: tagsViewReducer,
  global: globalReducer,
  project: projectReducer,
  worklog: worklogReducer,
  subTask: subTaskReducer
});

export default rootReducer;
