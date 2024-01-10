import React, { useEffect, useState } from 'react';
import profile_default from "../../img/profile_default.png";
import { User, UserProfileData } from '../../Type';
import axios from 'axios';

type Props = {
    user: User;
    onClick: () => void;
}

const LittleProfileVertical:React.FC<Props> = (props: Props) => {
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
    // const userProfileData = useRecoilValue(UserProfileState);
    // const {getUserProfile} = useProfile();

    useEffect(() => {
        axios.get("http://localhost:8080/api/user/profile", {
            params: {
                targetUserId: props.user.userId
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
    }, []);

    return(
        <div className='flex flex-col items-center text-center cursor-pointer w-60 h-220 p-10 rounded-8 shadow-md transition duration-300 ease-in-out bg-purple-200 border-purple-400 border-solid mt-5'
            onClick={props.onClick}
        >
            <img src={userProfileData.imageUrl ? userProfileData.imageUrl : profile_default} alt="Profile" className='w-20 h-20 rounded-full'/>
            <p className='font-bold'>{userProfileData.nickname}</p>
            <p className='font-bold'>{userProfileData.locationCountry}</p>
        </div>
    );
}

export default LittleProfileVertical;