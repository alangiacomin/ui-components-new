import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

const RouteComponent = (props) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    props.component().then((module) => {
      setComponent(() => (module.default));
    });
  });

  return Component ? <Component {...props} /> : null;
};

RouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default RouteComponent;
