export * from "./account-type"
export * from "./roles"
export * from "./status"

export enum Gender {
  male = "MALE",
  female = "FEMALE",
  others = "OTHERS",
}

export type OnlineStatus = "online" | "dnd" | "busy" | "offline"
