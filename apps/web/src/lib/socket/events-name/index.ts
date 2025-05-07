export const socketEvents = {
  user: {
    online: "user:status:online",
    statusUpdate: "user:status:update",
  },
  notification: {
    new: "notification:new",
  },
} as const
