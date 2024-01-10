import { useState } from "react";
import { useRecoilValue } from "recoil";
import { myProfileState } from "src/Recoil/MyProfileAtom";
import { LetterData } from "src/Type";
import { useLetter } from "./LetterFunctions";
import axios from "axios";

type Props = {
    letter: LetterData;
    onClose: () => void;
};

const Letter: React.FC<Props> = (props: Props) => {
    const myProfileData = useRecoilValue(myProfileState);
    const [translateMode, setTranslateMode] = useState(false);
    const [translatedContent, setTranslatedContent] = useState("");
    const API_KEY = 'AIzaSyBcS75L7-FvIel2uPykgw8VANTLqoBqNzI';

    const senderId: string = props.letter.senderId;
    const myId: string = myProfileData.userId;

    const contentTranslate = async (content: string) => {
            const API_URL = 'https://translation.googleapis.com/language/translate/v2'
            await axios.post(`${API_URL}?key=${API_KEY}`,{
                q: content,
                target: 'ko'
            })
            .then((res) => {
                const newContent = res.data.data.translations[0].translatedText;
                setTranslatedContent(newContent);
            })
            .catch((err) => {
                console.log(err);
            })
    
        
        setTranslateMode(!translateMode);
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 rounded-md z-50">
            {senderId !== myId ? (
                <div className="letter-container bg-gray-200 p-4 rounded-md">
                    <h1 className="letter-title text-lg font-bold mb-2">
                        From. {props.letter.senderNickName}
                    </h1>
                    <div className="content-container">
                        <p className="letter-content">
                            {translateMode ? translatedContent : props.letter.content}
                        </p>
                        <button className="block relative bg-red-400 text-white text-center p-2 md:p-4 rounded-5 border border-red-700 ml-10"
                            onClick={() => {
                                contentTranslate(props.letter.content);
                            }}>
                            {translateMode ? '원문 보기' : '번역'}
                        </button>
                    </div>
                    <div className="back-btn-container">
                        <button className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded" onClick={props.onClose}>
                            X
                        </button>
                    </div>
                </div>
            ) : (
                <div className="letter-container bg-gray-200 p-4 rounded-md">
                    <h1 className="letter-title text-lg font-bold mb-2">
                        To. {props.letter.receiverNickName}
                    </h1>
                    <div className="content-container">
                        <p className="letter-content">
                            {translateMode ? translatedContent : props.letter.content}
                        </p>
                        <button className="block relative bg-red-400 text-white text-center p-2 md:p-4 rounded-5 border border-red-700 ml-10"
                            onClick={() => {
                                contentTranslate(props.letter.content);
                            }}>
                            {translateMode ? '원문 보기' : '번역'}
                        </button>
                    </div>
                    <div className="back-btn-container">
                        <button className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded" onClick={props.onClose}>
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Letter;

