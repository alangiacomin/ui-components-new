import { useSelector } from 'react-redux';

const useRouterSelector = () => useSelector((state) => state.router);

const useUserSelector = () => useSelector((state) => state.user);

export {
  useRouterSelector,
  useUserSelector,
};
