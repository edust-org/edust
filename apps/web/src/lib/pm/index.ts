export const permissions = {
  feedbackCreate: 'feedback:create',
  feedbackRead: 'feedback:read',
  feedbackUpdate: 'feedback:update',
  feedbackDelete: 'feedback:delete',

  helpCenterCreate: 'helpCenter:create',
  helpCenterRead: 'helpCenter:read',
  helpCenterUpdate: 'helpCenter:update',
  helpCenterDelete: 'helpCenter:delete',

  organizationUpdate: 'organization:update',

  siteBuilderCreate: 'siteBuilder:create',
  siteBuilderRead: 'siteBuilder:read',
  siteBuilderUpdate: 'siteBuilder:update',
} as const;

export type PermissionValues = (typeof permissions)[keyof typeof permissions];

export type Permissions = typeof permissions;
