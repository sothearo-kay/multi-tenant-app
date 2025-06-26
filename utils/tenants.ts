const validTenants = new Map([
  ['demo', { name: 'Demo Company', active: true }],
  ['test', { name: 'Test Corp', active: true }],
  ['ro', { name: 'RO Enterprise', active: true }],
  ['acme', { name: 'Acme Inc', active: true }]
]);

export function isValidTenant(slug: string): boolean {
  return validTenants.has(slug) && validTenants.get(slug)?.active === true;
}

export function getTenantInfo(slug: string) {
  return validTenants.get(slug) || null;
}

export function getAllTenants() {
  return Array.from(validTenants.entries()).map(([slug, info]) => ({
    slug,
    ...info
  }));
}
