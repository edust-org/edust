export enum Status {
  pending = "PENDING",
  active = "ACTIVE",
  inactive = "INACTIVE",
  banned = "BANNED",
  trusted = "TRUSTED",
  archived = "ARCHIVED",
  deleted = "DELETED",

  unverified = "UNVERIFIED",
  verified = "VERIFIED",
  rejected = "REJECTED",
  blocked = "BLOCKED",
  suspended = "SUSPENDED",

  draft = "DRAFT",
  published = "PUBLISHED",
  scheduled = "SCHEDULED",
  pendingReview = "PENDING_REVIEW",
  underRevision = "UNDER_REVISION",
  approved = "APPROVED",

  unread = "UNREAD",
  read = "READ",
}

export default Status
