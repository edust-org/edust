export const socketEvents = {
  user: {
    online: "user:status:online",
    statusUpdate: "user:status:update",
    authUpdate: "user:auth:update",
  },
  notification: {
    new: "notification:new",
  },
  org: {
    online: "org:status:online",
    statusUpdate: "user:status:update",
    accessRolePermissionsUpdate: "access:role:permissions:update",
  },
} as const
