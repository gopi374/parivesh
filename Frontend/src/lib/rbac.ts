export const ROLES = {
  ADMIN: 'admin',
  PROPONENT: 'proponent',
  SCRUTINY: 'scrutiny',
  MOM: 'mom',
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['admin', 'proponent', 'scrutiny', 'mom'], // Admin can see everything
  [ROLES.PROPONENT]: ['proponent'],
  [ROLES.SCRUTINY]: ['scrutiny'],
  [ROLES.MOM]: ['mom'],
};

export const hasPermission = (userRole: string | null, allowedRoles: string[]) => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};
