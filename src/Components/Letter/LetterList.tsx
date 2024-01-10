import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { letterState } from "src/Recoil/LetterAtom";
import { SelectedUserState } from "src/Recoil/SelectedUserAtom";
import { useLetter } from "./LetterFunctions";
import LetterBox from "./LetterBox";
import { LetterData } from "src/Type";
import Letter from "./Letter";
import UserProfileHeader from "../Profile/UserProfileHeader";
import UserProfile from "../Profile/UserProfile";
import UserProfileTabBar from "../Profile/UserProfileTabBar";
import LetterSender from "./LetterSender";

const LetterList:React.FC = () => {
    const letters = useRecoilValue(letterState);
    const [selectedUser, setSelectedUser] = useRecoilState(SelectedUserState);
    const [selectedLetter, setSelectedLetter] = useState<LetterData | null>(null);
    const [letterMode, setLetterMode] = useState<Boolean>(false);
    const { getLetters } = useLetter();
    const [profileMode, setProfileMode] = useState<Boolean>(false);
    const [senderMode, setSenderMode] = useState<Boolean>(false);
    

    useEffect(() => {
        setLetterMode(false);
        setProfileMode(false);
        setSenderMode(false);
        if(selectedUser.userId === ''){
            const storedUser = localStorage.getItem("selectedUser");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setSelectedUser(parsedUser);
              }
        }
        else{
            localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
        }

        getLetters(selectedUser);
    }, [selectedUser]);

    const letterClick = (letter: LetterData) => {
        setSelectedLetter(letter);
        if(letter.content.length === 0){
            return;
        }
        else {
            setLetterMode(true);
        } 
    }

    const profileClick = () => {
        setProfileMode(true);
    }

    const tabBarBtnClick = () => {
        setSenderMode(true);
    }

    const closeClick = () => {
        setLetterMode(false);
        setProfileMode(false);
        setSenderMode(false);
    }

    
    return(
        <div>
            <UserProfileHeader onClick={profileClick}/>
           <div className="block fixed right-0 w-5/6 z-10 bg-white border-purple-400 overflow-y-auto grid grid-cols-6 gap-5 mt-52">
                {letters?.map((letter, index) => (
                    <div key={index} onClick={() => letterClick(letter)}>
                        <LetterBox letter={letter}/>
                    </div>
                ))}
            </div> 
            {
                    letterMode && selectedLetter &&
                    <Letter letter={selectedLetter} onClose={closeClick}/>
            }
            {
                profileMode &&
                <UserProfile onClose={closeClick} />
            }
            <UserProfileTabBar onClick={tabBarBtnClick}/>
            {
                senderMode &&
                <LetterSender onClose={closeClick} />
            }
        </div>
    );
}


export default LetterList;