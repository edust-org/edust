export const socketEvents = {
  rooms: {
    supportTicketJoin: "support:ticket:join",
    supportTicketLeave: "support:ticket:leave",
  },
  user: {
    online: "user:status:online",
    statusUpdate: "user:status:update",
    authUpdate: "user:auth:update",
  },
  notification: {
    new: "notification:new",
  },
  support: {
    ticket: {
      newMessage: "support:ticket:new_message",
    },
  },
  org: {
    online: "org:status:online",
    statusUpdate: "user:status:update",
    accessRolePermissionsUpdate: "access:role:permissions:update",
  },
} as const
