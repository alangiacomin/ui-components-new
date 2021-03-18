import { getRoutesFromConfig } from './routeHelper';

describe('getRoutesFromConfig', () => {
  test('null config', () => {
    const routes = getRoutesFromConfig(null);
    expect(routes).toEqual({});
  });

  test('empty object config', () => {
    const routes = getRoutesFromConfig({});
    expect(routes).toEqual({});
  });

  test('missing path', () => {
    const routes = getRoutesFromConfig({
      home: {
        title: 'Home',
        to: '/home',
      },
    });
    expect(routes).toMatchObject({
      home: {
        title: 'Home',
        to: '/home',
        path: '/home',
      },
    });
  });

  test('remove subroutes', () => {
    const routes = getRoutesFromConfig({
      home: {
        title: 'Home',
        to: '/home',
        subRoutes: {},
      },
    });
    expect(routes).not.toMatchObject({
      home: {
        subRoutes: {},

      },
    });
  });

  test('split subroutes', () => {
    const routes = getRoutesFromConfig({
      page: {
        title: 'page',
        to: '/page',
        exact: false,
        subRoutes: {
          edit: {
            to: '/edit',
            perm: 'edit_page_data',
          },
        },
      },
    });
    expect(routes).toMatchObject({
      page: {
        title: 'page',
        to: '/page',
      },
      page_edit: {
        to: '/page/edit',
        perm: 'edit_page_data',
      },
    });
  });
});
