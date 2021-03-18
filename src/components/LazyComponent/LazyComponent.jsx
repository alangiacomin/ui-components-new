import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

// const importRoute = (nomeRoute) => import(`./components/${nomeRoute}/${nomeRoute}`);

const LazyComponent = ({ component, ...others }) => {
  const [LoadedComponent, setLoadedComponent] = useState(null);

  useEffect(() => {
    component().then((module) => {
      setLoadedComponent(() => (module.default));
    });
  });

  return LoadedComponent ? <LoadedComponent {...others} /> : null;
};

LazyComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default LazyComponent;
