import type { RouterConfig } from 'nuxt/schema';
import type { RouteRecordRaw } from 'vue-router';

export default <RouterConfig>{
  routes(routes) {
    const tenant = useTenant();

    if (tenant) {
      return routes
        .filter((route) => isTenantRoute(route))
        .map((route) => ({
          ...route,
          path: route.path.replace(/^\/tenant\/?/, '/')
        }));
    }

    return routes.filter((route) => !isTenantRoute(route));
  }
};

const isTenantRoute = (route: RouteRecordRaw) => route.path.match(/^\/tenant\/?/);
