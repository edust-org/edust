export const orgPermissions = {
  orgMenuAccessControl: "org:menu:access_control",
  orgMenuSite: "org:menu:site",
  orgMenuStudents: "org:menu:students",

  orgAccessControlRoleFullAccess: "org:access_control:role:*",
  orgAccessControlRoleCreate: "org:access_control:role:create",
  orgAccessControlRoleRead: "org:access_control:role:read",
  orgAccessControlRoleUpdate: "org:access_control:role:update",
  orgAccessControlRoleDelete: "org:access_control:role:delete",

  orgAccessControlRolePermissionFullAccess:
    "org:access_control:role:permission:*",
  orgAccessControlRolePermissionCreate:
    "org:access_control:role:permission:create",
  orgAccessControlRolePermissionRead: "org:access_control:role:permission:read",
  orgAccessControlRolePermissionUpdate:
    "org:access_control:role:permission:update",
  orgAccessControlRolePermissionDelete:
    "org:access_control:role:permission:delete",

  orgAccessControlRoleUsersRead: "org:access_control:role:users:read",
  orgAccessControlRoleAssignCreate: "org:access_control:role:assign:create",
  orgAccessControlRoleAssignDelete: "org:access_control:role:assign:delete",
  orgAccessControlUsersRead: "org:access_control:users:read",

  orgStudentFullAccess: "org:student:*",
  orgStudentUsersRead: "org:student:users:read",
  orgStudentRead: "org:student:read",
  orgStudentCreate: "org:student:create",
  orgStudentDelete: "org:student:delete",

  orgSiteBuilderCreate: "org:site_builder:create",
  orgSiteBuilderRead: "org:site_builder:read",
  orgSiteBuilderUpdate: "org:site_builder:update",
} as const
