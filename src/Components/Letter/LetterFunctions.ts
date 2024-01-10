import axios, { AxiosRequestConfig } from "axios"
import { User } from "../../Type"
import { useSetRecoilState } from "recoil";
import { letterState } from "../../Recoil/LetterAtom";
import { useState } from "react";

interface LetterFunctions {
    getLetters: (selectedUser: User) => void;
    // contentTranslate: (content: string) => Promise<string>;
  }

export const useLetter = (): LetterFunctions => {
    const setLetters = useSetRecoilState(letterState);
    const API_KEY = 'AIzaSyBcS75L7-FvIel2uPykgw8VANTLqoBqNzI';


    // 편지 목록 가져오기
    const getLetters = (selectedUser: User) => {
        axios.get("http://localhost:8080/api/letters", {
            params: {
                friendUserId: selectedUser.userId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            const newLetters = res.data;

            setLetters(newLetters);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // const contentTranslate = async (content: string) => {
    //     const API_URL = 'https://translation.googleapis.com/language/translate/v2'
    //     await axios.post(`${API_URL}?key=${API_KEY}`,{
    //         q: content,
    //         target: 'ko'
    //     })
    //     .then((res) => {
    //         return (res.data.data.translations[0]?.translatedText || '') as string;
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return '' as string;
    //     })

    // }
    

    


    return {
        getLetters,
        // contentTranslate,

    };
}