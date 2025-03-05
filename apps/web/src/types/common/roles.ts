/**
 * Enum representing various user roles in the application.
 */
export enum Roles {
  /** Guest with restricted access to certain parts of the application. */
  GUEST = "GUEST",

  /** User with basic access to the application. */
  USER = "USER",

  /** Administrator with full access to the system. */
  ADMINISTRATOR = "ADMINISTRATOR",

  /** Owner of an organization with special permissions. */
  OWNER = "OWNER",

  /** Editor with permission to edit content. */
  EDITOR = "EDITOR",
}
