import { auth } from "./auth";
import { organizations } from "./organizations";
import { publicApi } from "./public";
import { user } from "./user";

export const apiV0 = [...publicApi,...auth, user, ...organizations];
