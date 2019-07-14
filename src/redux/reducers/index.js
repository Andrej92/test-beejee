import { combineReducers } from 'redux';
import auth from './auth';
import tasks from './tasks';
import modals from './modals';

export default combineReducers({ auth, tasks, modals });
