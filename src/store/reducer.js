import { combineReducers } from 'redux';
import { testReducers } from './testStore'
export default combineReducers({
  testReducers:testReducers
});

