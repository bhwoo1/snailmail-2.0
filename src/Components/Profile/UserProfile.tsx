import { useRecoilValue } from "recoil";
import { SelectedUserState } from "../../Recoil/SelectedUserAtom";
import profile_default from '../../img/profile_default.png';
import { UserProfileData } from "../../Type";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
    onClose: () => void;
}

const UserProfile:React.FC<Props> = (props: Props) => {
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
    }, []);

    return(
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 rounded-md z-50">
        <div className="flex flex-col items-center p-20 m-20">
            <h1 className="text-center text-3xl font-bold mb-4">{userProfileData.nickname}</h1>
            <div className="flex items-center flex-col md:flex-row">
                <img src={userProfileData.imageUrl ? userProfileData.imageUrl : profile_default} alt="profile" className="rounded-full h-32 w-32 mb-4 md:mr-4" />
                <div className="md:w-96">
                    <label htmlFor="introduction" className="block text-gray-700 font-bold mb-2">{userProfileData.nickname} 소개</label>
                    <p className="text-gray-800 mb-2">{userProfileData.bio}</p>
                    <p className="text-gray-700 font-bold">성별 : {userProfileData.gender}</p>
                    <p className="text-gray-700 font-bold">위치 : {userProfileData.locationCountry}</p>
                </div> 
            </div>
            <div className="back-btn-container">
                <button className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded" onClick={props.onClose}>
                    X
                </button>
            </div>
        </div>
        </div>
    );
}

export default UserProfile;