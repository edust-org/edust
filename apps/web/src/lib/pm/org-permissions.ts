export const orgPermissions = {
  orgMenuAccessControl: "org:menu:access_control",
  orgMenuSite: "org:menu:site",

  orgAccessControlRoleCreate: "org:access_control:role:create",
  orgAccessControlRoleRead: "org:access_control:role:read",
  orgAccessControlRoleUpdate: "org:access_control:role:update",
  orgAccessControlRoleDelete: "org:access_control:role:delete",
  orgAccessControlRolePermissionCreate:
    "org:access_control:role_permission:create",
  orgAccessControlRolePermissionRead: "org:access_control:role_permission:read",
  orgAccessControlRolePermissionUpdate:
    "org:access_control:role_permission:update",
  orgAccessControlRolePermissionDelete:
    "org:access_control:role_permission:delete",

  orgSiteBuilderCreate: "org:site_builder:create",
  orgSiteBuilderRead: "org:site_builder:read",
  orgSiteBuilderUpdate: "org:site_builder:update",
} as const
