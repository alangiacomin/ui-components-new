import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { PropTypes } from 'prop-types';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { emptyArrayIfNull } from '../../utils/arrayHelper';
import { configureAppStore } from '../../utils/configureAppStore';
import ProtectedRoute from '../ProtectedRoute/ProtectedRouteComponent';

// const importRoute = (nomeRoute) => import(`./components/${nomeRoute}/${nomeRoute}`);
// const importComponent = (name) => import(`./components/${name}/${name}`);

const Application = (props) => {
  const {
    reducer, middleware, enableMiddlewareLogger, routes, appBaseName, importComponent, NotFoundRoute,
  } = props;

  const history = useMemo(() => createBrowserHistory({ basename: appBaseName }), [appBaseName]);

  const store = useMemo(() => configureAppStore({
    history,
    reducer: emptyArrayIfNull(reducer),
    middleware: emptyArrayIfNull(middleware),
    enableMiddlewareLogger,
  }), [enableMiddlewareLogger, history, middleware, reducer]);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes && Object
            .entries(routes)
            .map(([key, route]) => (
              route.component
                ? (
                  <ProtectedRoute
                    key={key}
                    {...route}
                    component={() => importComponent(route.component)}
                  />
                )
                : null))}
          {NotFoundRoute && (
            <Route path="*">
              <NotFoundRoute />
            </Route>
          )}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

Application.propTypes = {
  reducer: PropTypes.shape({}),
  middleware: PropTypes.arrayOf(PropTypes.shape({})),
  enableMiddlewareLogger: PropTypes.bool,
  appBaseName: PropTypes.string,
  routes: PropTypes.shape({}).isRequired,
  importComponent: PropTypes.func.isRequired,
  NotFoundRoute: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

Application.defaultProps = {
  reducer: null,
  middleware: null,
  enableMiddlewareLogger: false,
  appBaseName: '/',
  NotFoundRoute: null,
};

export default Application;
