export function can(permission: string, permissions: string[]): boolean {
  return permissions.includes(permission);
}
