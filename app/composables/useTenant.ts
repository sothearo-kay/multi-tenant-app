export function useTenant() {
  const { domain } = useAppConfig();
  const { hostname } = useRequestURL();

  if (hostname === domain) {
    return { tenant: null, isValid: true };
  }

  const tenant = hostname.replace(`.${domain}`, '');
  const valid = isValidTenant(tenant);

  return { tenant, isValid: valid };
}
