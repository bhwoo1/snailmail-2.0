import { useRecoilValue } from "recoil";
import { myProfileState } from "src/Recoil/MyProfileAtom";
import { LetterData } from "src/Type";

type Props = {
    letter: LetterData;
    
}

const LetterBox:React.FC<Props> = (props: Props) => {
    const myProfileData = useRecoilValue(myProfileState);



    const senderId:string = props.letter.senderId;
    const myId:string = myProfileData.userId;
    const deliveredTime = new Date(props.letter.deliveredAt);
    const currentTime:Date = new Date();

    const formattedDeliveredTime = deliveredTime.toString() !== 'Invalid Date' ? deliveredTime.toLocaleString() : 'Invalid Date';
    const isDelivered:boolean = currentTime > deliveredTime;

    const shortenedContent:string = props.letter.content?.substring(0, 10);

    return(
        <>
            {senderId !== myId ?
                    isDelivered ?
                            <div className="flex flex-col items-center cursor-pointer w-52 h-220 p-10 rounded-8 shadow-md transition-shadow duration-300 bg-red-200 border-solid border-2 border-rose-300 m-5">
                                <p className="font-bold text-15">From.{props.letter.senderNickName}</p>
                                <p className="letter-content">{shortenedContent}...</p>
                            </div>
                        :
                            <div className="flex flex-col items-center w-52 h-220 p-10 rounded-8 shadow-md transition-shadow duration-300 bg-gray-200 border-solid border-2 border-gray-300 m-5 pointer-events-none">
                                <p className="font-bold text-15">From.{props.letter.senderNickName}</p>
                                <p>도착 시간: {formattedDeliveredTime}</p>
                            </div>
                :
                    isDelivered ?
                        <div className="flex flex-col items-center cursor-pointer w-52 h-220 p-10 rounded-8 shadow-md transition-shadow duration-300 bg-blue-200 border-solid border-2 border-blue-300 m-5">
                            <p className="font-bold text-15">To.{props.letter.receiverNickName}</p>
                            <p className="letter-content">{shortenedContent}...</p>
                        </div>
                    :
                        <div className="flex flex-col items-center w-52 h-220 p-10 rounded-8 shadow-md transition-shadow duration-300 bg-gray-200 border-solid border-2 border-gray-300 m-5 pointer-events-none">
                            <p className="font-bold text-15">To.{props.letter.receiverNickName}</p>
                            <p>도착 시간: {formattedDeliveredTime}</p>
                        </div>
            }
        </>
    );
}


export default LetterBox;