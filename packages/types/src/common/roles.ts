/**
 * Enum representing various user roles in the application.
 */
export enum Roles {
  /** Guest with restricted access to certain parts of the application. */
  guest = "GUEST",

  /** User with basic access to the application. */
  user = "USER",

  /** Administrator with full access to the system. */
  administrator = "ADMINISTRATOR",

  /** Owner of an organization with special permissions. */
  owner = "OWNER",

  /** Editor with permission to edit content. */
  editor = "EDITOR",

  student = "STUDENT",
}
