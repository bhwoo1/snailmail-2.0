import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectedUserState } from "src/Recoil/SelectedUserAtom";
import { friendLengthState, friendState } from "src/Recoil/FriendAtom";
import axios from "axios";

type Props = {
    onClose: () => void;
}

const LetterSender:React.FC<Props> = (props: Props) => {
    const selectedUser = useRecoilValue(SelectedUserState);
    const setFriends = useSetRecoilState(friendState);
    const setFriendLength = useSetRecoilState(friendLengthState);
    const [content, setContent] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();



    try {
      // Axios를 사용하여 편지를 전송
      await axios.post("http://localhost:8080/api/letter", {
        receiverId: selectedUser.userId,
        content: content,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });


      // 편지 전송 성공 시 Friends 목록을 업데이트하는 액션 디스패치
      const response = await axios.get("http://localhost:8080/api/friends", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const updatedFriends = response.data;
      setContent("");

      setFriends(updatedFriends);
      setFriendLength(updatedFriends.length);
      // 편지 전송 성공 시에 localStorage에 선택된 사용자 정보 저장
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
      window.location.reload();
      

      alert('편지 전송 성공!');
    } catch (error) {
      console.log(error);
      alert('편지 전송에 실패했습니다.');
    }

    }


    return(
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 rounded-md z-50">
        <div className="flex flex-col items-center p-20 m-20">
            <form onSubmit={handleSubmit}>
                <div>
                    <span>To. {selectedUser.nickname}</span>
                </div>
                <div>
                    <label>메시지 : </label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value) }
                        required 
                    />
                </div>
                <button type="submit" className="block relative bg-violet-400 text-white text-center p-2 md:p-4 rounded-5 border border-purple-700 ml-10">편지 전송</button>
            </form>
            <div className="back-btn-container">
                <button className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded" onClick={props.onClose}>
                    X
                </button>
            </div>
        </div>
        </div>
    );
}

export default LetterSender;