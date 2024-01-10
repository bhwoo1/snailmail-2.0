import { useEffect } from "react";
import { friendLengthState, friendState } from "../../Recoil/FriendAtom";
import axios from "axios";
import {  User } from "../../Type";
import UserLittleProfile from "../Profile/UserLittleProfile";
import LittleProfile from "../Profile/LittleProfile";
import { Link } from "react-router-dom";
import snailmail_logo_little from "../../img/snailmail_logo_little.png";
import { useProfile } from "../Profile/ProfileFunctions";
import { useRecoilState } from "recoil";
import { SelectedUserState } from "src/Recoil/SelectedUserAtom";

const Friends: React.FC = () => {
    const [friends, setFriends] = useRecoilState(friendState);
    const [friendLength, setFriendLength] = useRecoilState(friendLengthState);
    const [selectedUser, setSelectedUser] = useRecoilState(SelectedUserState);
    const { getMyProfile } = useProfile();

    

    useEffect(() => {
        getMyProfile();
        axios.get("http://localhost:8080/api/friends", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
        })
        .then((res) => {
          
          const friendsData = res.data;
          setFriends(friendsData); // 가져온 데이터로 friendState 업데이트
          setFriendLength(friendsData.length); // friendLengthState 업데이트
          

        
        })
        .catch((err) => {
          console.log(err);
        });

      }, [setFriends, setFriendLength]);

      const userSelect = (friend:User) => {
        setSelectedUser(friend);
    }

    

    return(
        <div className={`block fixed text-left bottom-0 bg-white overflow-y-auto w-1/6 p-4 h-full`}>
          <div>
            <Link to="/">
              <div className="bg-purple-200 p-1 container mx-auto border border-purple-400 flex items-center justify-center flex-col cursor-pointer">
              <div><img src={snailmail_logo_little} className="w-16 h-16" alt="Logo"/></div>
              <span className="text-2xl font-bold">느린 우체통</span>
              </div>
            </Link>
            <Link to="/profile"><LittleProfile /></Link>
            <div className="bg-purple-200 border border-purple-400 p-2 text-center"><p className="font-bold text-xl">친구 목록</p></div>
            {friendLength === 0 ? (
                <div className="bg-purple-200 border border-purple-400 items-center justify-center flex flex-col">
                  <p>친구 : 0</p>
                  <Link to="/users">
                      <button className="block relative bg-violet-400 text-white text-center p-2 md:p-4 rounded-5 border-0 mt-10">
                        친구 찾기
                       </button>
                  </Link>
                </div>
              ) : (
                <>
                  {friends.map((friend) => (
                    <Link key={friend.userId} to={`/letters`}>
                      <div onClick={() => userSelect(friend)}>
                        <UserLittleProfile user={friend} />
                      </div>
                    </Link>
                  ))}
                </>
            )}
          </div>
        </div>
    );
}

export default Friends;