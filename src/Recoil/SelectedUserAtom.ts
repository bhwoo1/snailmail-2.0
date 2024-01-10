import { atom } from "recoil";
import { User } from "../Type";

export const SelectedUserState = atom<User>({
    key: "selectedUserState",
    default: {
        userId: "",
        nickname: "",
        imageUrl: "",
        locationCountry: ""
    },
})