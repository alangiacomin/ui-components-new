import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

const configureAppStore = ({
  history, reducer, middleware, enableMiddlewareLogger,
}) => {
  const concatMiddlewares = () => {
    let sm = [
      routerMiddleware(history),
    ];
    if (middleware) {
      sm = [...sm, ...middleware];
    }
    if (enableMiddlewareLogger) {
      sm = [...sm, createLogger()];
    }
    return sm;
  };

  const store = configureStore({
    reducer: {
      router: connectRouter(history),
      ...reducer,
    },
    // preloadedState:
    middleware: concatMiddlewares(),
  });

  // if (process.env.NODE_ENV !== "production" && module.hot) {
  //    module.hot.accept("./reducers/reducers", () =>
  //        store.replaceReducer(rootReducer)
  //    );
  // }

  return store;
};

export default configureAppStore;
