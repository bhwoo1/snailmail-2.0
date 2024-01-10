import { atom } from "recoil";
import { MyData } from "../Type";

export const myProfileState = atom<MyData>({
    key: "myProfileState",
    default: {
        userId: "",
        nickname: "",
        gender: "",
        bio: "",
        imageUrl: "",
        locationCountry: ""
    }
})