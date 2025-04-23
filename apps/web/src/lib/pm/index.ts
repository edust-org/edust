import { orgPermissions } from './org-permissions';

export const permissions = {
  ...orgPermissions,

  feedbackCreate: 'feedback:create',
  feedbackRead: 'feedback:read',
  feedbackUpdate: 'feedback:update',
  feedbackDelete: 'feedback:delete',

  helpCenterCreate: 'help_center:create',
  helpCenterRead: 'help_center:read',
  helpCenterUpdate: 'help_center:update',
  helpCenterDelete: 'help_center:delete',
} as const;

export type PermissionValues = (typeof permissions)[keyof typeof permissions];

export type Permissions = typeof permissions;
