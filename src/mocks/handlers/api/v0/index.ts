import { auth } from "./auth";
import { organizations } from "./organizations";
import { user } from "./user";

export const apiV0 = [...auth, user, ...organizations];
