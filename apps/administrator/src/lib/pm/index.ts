export const permissions = {
  admMenuFeedback: "adm:menu:feedback",
  admMenuHelpCenter: "adm:menu:help_center",
  admMenuInstitutes: "adm:menu:institutes",
  admMenuOrganizations: "adm:menu:organizations",
  admMenuUsers: "adm:menu:users",
  admMenuSupport: "adm:menu:support",

  admFeedbackFullAccess: "adm:feedback:*",
  admHelpCenterFullAccess: "adm:help_center:*",
  admInstitutesFullAccess: "adm:institutes:*",
  admOrganizationsFullAccess: "adm:organizations:*",
  admUsersFullAccess: "adm:users:*",
  admSupportFullAccess: "adm:support:*",
} as const

export type PermissionValues = (typeof permissions)[keyof typeof permissions]

export type Permissions = typeof permissions
