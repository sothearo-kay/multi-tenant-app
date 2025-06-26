import { OUR_DOMAIN } from '~/constants';

export function useTenant() {
  const { hostname } = useRequestURL();

  if (hostname === OUR_DOMAIN) {
    return { tenant: null, isValid: true };
  }

  const tenant = hostname.replace(`.${OUR_DOMAIN}`, '');
  const valid = isValidTenant(tenant);

  return { tenant, isValid: valid };
}
