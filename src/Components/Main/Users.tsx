import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "../../Type";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedUserState } from "../../Recoil/SelectedUserAtom";
import LittleProfileVertical from "../Profile/LittleProfileVertical";
import LetterSender from "../Letter/LetterSender";
import { friendState } from "src/Recoil/FriendAtom";

const Users:React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useRecoilState(SelectedUserState);
    const [sendMode, setSendMode] = useState<Boolean>(false);
    const friends = useRecoilValue(friendState);

    useEffect(() => {
        axios.get("http://localhost:8080/api/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            // 친구 목록에서 사용자를 필터링합니다.
            const filteredUsers = res.data.filter((user:User) => !friends.some(friend => friend.userId === user.userId));
            setUsers(filteredUsers);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [friends]);

    const userSelect = (user:User) => {
        setSelectedUser(user);
        console.log(selectedUser.nickname);
    }

    const closeClick = () => {
        setSendMode(false);
    }

    return(
            <div className="block fixed right-0 w-5/6 z-10 bg-white border-purple-400 overflow-y-auto grid grid-cols-6 gap-5 mt-28">
            {users.map(user => {
                return(
                    <LittleProfileVertical 
                        key={user.userId} 
                        user={user} 
                        onClick={() => {
                            userSelect(user)
                            setSendMode(true)
                        }}/>
                )
            })}
            {
                sendMode && 
                <LetterSender onClose={closeClick} />
            }
            </div>
    );
}

export default Users;