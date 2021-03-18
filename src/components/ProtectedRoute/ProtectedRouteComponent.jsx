import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { emptyObjectIfNull } from '../../utils/objectHelper';
import { useRouterSelector } from '../../utils/stateHelper';
import { hasPermission } from '../../utils/userHelper';
import LazyComponent from '../LazyComponent/LazyComponent';

const ProtectedRoute = (props) => {
  const {
    perm, to, homePath, loginPath, logoutPath, component, renderUnauthorized, ...others
  } = props;

  // const thisReferrer = useSelector((state) => state.router.location);
  const thisReferrer = useRouterSelector().location;

  // const pastReferrer = (router.location.state || {}).referrer;
  const pastReferrer = emptyObjectIfNull(useRouterSelector().location.state).referrer;

  const user = useSelector((state) => state.user);

  // verifica specifico permesso per questo route
  if (perm && !perm.startsWith('special_') && !hasPermission(user, perm)) {
    if (user.id) {
      return renderUnauthorized();
    }
    return (
      <Redirect to={{
        pathname: loginPath,
        state: { referrer: thisReferrer },
      }}
      />
    );
  }
  // verifica permessi speciali
  if (perm === 'special_guests_only' && user.id) {
    return <Redirect to={pastReferrer || homePath} />;
  }
  if (perm && perm === 'special_users_only' && !user.id) {
    if (to === logoutPath) {
      return <Redirect to={homePath} />;
    }
    return (
      <Redirect to={{
        pathname: loginPath,
        state: { referrer: thisReferrer },
      }}
      />
    );
  }
  // permessi ok, accedo alla route
  return (
    <LazyComponent component={component} to={to} {...others} />
  );
  // permessi ok, accedo alla route
  // return (
  //   <ErrorBoundary>
  //     <Route {...props} />
  //   </ErrorBoundary>
  // );
};

ProtectedRoute.propTypes = {
  perm: PropTypes.string,
  to: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  homePath: PropTypes.string,
  loginPath: PropTypes.string,
  logoutPath: PropTypes.string,
  renderUnauthorized: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  perm: '',
  homePath: '/',
  loginPath: '/login',
  logoutPath: '/logout',
  renderUnauthorized: () => null,
};

// const mapStateToProps = (state) => ({
//   user: state.user,
//   router: state.router,
// });

export default ProtectedRoute;

// export default connect(mapStateToProps)(ProtectedRoute);
