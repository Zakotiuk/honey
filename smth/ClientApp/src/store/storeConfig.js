import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { loginReducer } from '../components/login/reducer';
import { registerReducer } from '../components/registration/reducer';
import {workAboveStudentreducer} from '../components/workAboveStudents/reducer'
import { workAboveCourseReducer } from '../components/workAboveCourses/reducer';
import {courseForStudentReducer} from '../components/coursesForStudent/reducer'

export const history = createBrowserHistory({ basename: "" });

export default function configureStore(history, initialState) {
  const reducers = {
    login: loginReducer,
    register : registerReducer,
    panelSt : workAboveStudentreducer,
    panel : workAboveCourseReducer,
    courses : courseForStudentReducer,
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODEENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    window.devToolsExtension = window.REDUXDEVTOOLSEXTENSION;
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
