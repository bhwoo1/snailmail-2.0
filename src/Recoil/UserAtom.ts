import { atom } from "recoil";
import { User } from "../Type";

export const UserState = atom({
    key: "userState",
    default: [] as User[],
});