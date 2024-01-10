
import profile_default from "../../img/profile_default.png";
import { User, UserProfileData} from "../../Type";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
    user: User;
}


const UserLittleProfile:React.FC<Props> = (props:Props) => {
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
        <div className="flex items-center cursor-pointer p-10 rounded-8 shadow-md transition duration-300 ease-in-out bg-purple-200 border border-purple-400 w-full">
            <img src={userProfileData.imageUrl ? userProfileData.imageUrl : profile_default} alt="Profile" className="w-20 h-20 p-3 rounded-full"/>
            <div className="flex flex-col text-left">
                <p className='font-bold text-sm'>{userProfileData.nickname}</p>
                <p className='font-bold text-sm'>{userProfileData.locationCountry}</p>
            </div>
        </div>
    );
}

export default UserLittleProfile;