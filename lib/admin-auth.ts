export const ADMIN_PASSWORD = "88888888";

export const ADMIN_PASSWORD_HEADER = "x-admin-password";

export function isAdminAuthorized(request: Request): boolean {
  return request.headers.get(ADMIN_PASSWORD_HEADER) === ADMIN_PASSWORD;
}
