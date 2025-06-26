import { OUR_DOMAIN } from '~/constants/config';

export function useTenant() {
  const { hostname } = useRequestURL();

  if (hostname === OUR_DOMAIN) {
    return null;
  }

  return hostname.replace(`.${OUR_DOMAIN}`, '');
}
