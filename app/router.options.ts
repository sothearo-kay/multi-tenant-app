import type { RouterConfig } from 'nuxt/schema';
import type { RouteRecordRaw } from 'vue-router';

export default <RouterConfig>{
  routes(routes) {
    const { tenant, isValid } = useTenant();

    if (!tenant) {
      // Main domain: show only non-tenant routes
      return routes.filter((route) => !isTenantRoute(route));
    }

    if (!isValid) {
      return [];
    }

    // Tenant subdomain: show only tenant routes and normalize paths
    return routes.filter(isTenantRoute).map(normalizeRoute);
  }
};

const isTenantRoute = (route: RouteRecordRaw) => route.path.match(/^\/tenant\/?/);

const normalizeRoute = (route: RouteRecordRaw) => {
  return {
    ...route,
    path: route.path.replace(/^\/tenant\/?/, '/')
  };
};
