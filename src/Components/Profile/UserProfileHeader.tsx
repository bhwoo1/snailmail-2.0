import { useRecoilValue } from "recoil";
import profile_default from "../../img/profile_default.png";
import { SelectedUserState } from "../../Recoil/SelectedUserAtom";
import { UserProfileData} from "../../Type";
import React, { useEffect, useState } from "react";
import axios from "axios";


type Props = {
    onClick: () => void;
}


const UserProfileHeader:React.FC<Props> = (props: {onClick: () => void}) => {
    const selectedUser = useRecoilValue(SelectedUserState);
    const [userProfileData, setUserProfileData] = useState<UserProfileData>({
        userId: '',
        nickname: '',
        gender: '',
        bio: '',
        imageUrl: '',
        locationCountry: '',
        likeScore: 0,
        hasLikedOrDisliked: false,
    });

    

    useEffect(() => {
        axios.get("http://localhost:8080/api/user/profile", {
            params: {
                targetUserId: selectedUser.userId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            const userData: UserProfileData = {
                userId: res.data.userId,
                nickname: res.data.nickname,
                gender: res.data.gender,
                bio: res.data.bio,
                likeScore: res.data.likeScore,
                imageUrl: res.data.imageUrl,
                hasLikedOrDisliked: res.data.hasLikedOrDisliked,
                locationCountry: res.data.locationCountry,
            };
    
            setUserProfileData(userData);
            
        })
        .catch((err) => {
            console.log(err);
        })

    }, [selectedUser]);
    
    return(
        <div className="block fixed top-4 right-0 my-4 p-4 w-5/6 z-20 mt-10">
            <div className="container mx-auto flex items-center p-10 cursor-pointer justify-end" onClick={props.onClick}>
                <div className="flex flex-col text-right">
                    <p className='font-bold'>{userProfileData.nickname}</p>
                    <p className='font-bold'>{userProfileData.locationCountry}</p>
                </div>
                <img src={userProfileData.imageUrl ? userProfileData.imageUrl : profile_default} alt="Profile" className="w-20 h-20 p-3 rounded-full"/>
            </div>
        </div>
    );
}

export default UserProfileHeader;