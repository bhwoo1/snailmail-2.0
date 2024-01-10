import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { myProfileState } from '../../Recoil/MyProfileAtom';
import profile_default from '../../img/profile_default.png';
import { useProfile } from './ProfileFunctions';

const MyProfile: React.FC = () => {
    const [myProfileData, setMyProfileData] = useRecoilState(myProfileState);
    const [editMyProfileState, setEditMyProfileState] = useState<boolean>(false);
    const { profilePhotoChange, editPhoto, editBio } = useProfile();
    const [photoChangeMode, setPhotoChangeMode] = useState<boolean>(false);
    const editProfile = () => {
        setEditMyProfileState(!editMyProfileState);
    };

    const saveIntroduction = () => {
        editBio();
    };

    const savePhoto = () => {
        editPhoto();
        setPhotoChangeMode(false);
    };

    return (
        <div className='block fixed right-0 w-5/6 z-10 bg-white overflow-y-auto mt-28 flex justify-center items-center'>
            <div className="flex flex-col items-center p-20 m-20">
                <h1 className="text-center text-3xl font-bold mb-4">{myProfileData.nickname}</h1>
                <div className="flex items-center flex-col md:flex-row">
                    <img src={myProfileData.imageUrl ? myProfileData.imageUrl : profile_default} alt="프로필 사진" className="rounded-full h-32 w-32 mb-4 md:mr-4 cursor-pointer" onClick={() => setPhotoChangeMode(!photoChangeMode)} />
                    {
                        photoChangeMode &&
                        <div className='flex flex-col items-center'>
                            <input type="file" onChange={(e) => profilePhotoChange(e)} accept="image/*" /> 
                            <div className='flex flex-row justify-center'>
                            <button className='bg-purple-500 text-white py-2 px-4 mt-4 mr-4 rounded' onClick={savePhoto}>저장</button>
                            </div>
                        </div>
                    }
                    <div className="md:w-96">
                        <label htmlFor="introduction" className="block text-gray-700 font-bold mb-2">
                            {myProfileData.nickname} 소개
                        </label>
                        {editMyProfileState ? (
                            <textarea
                                id="introduction"
                                value={myProfileData.bio}
                                placeholder="자기소개를 입력하세요..."
                                onChange={(e) => setMyProfileData({ ...myProfileData, bio: e.target.value })}
                                className="border rounded py-2 px-3 w-full mb-2"
                            />
                        ) : (
                            <p className="text-gray-800 mb-2">{myProfileData.bio}</p>
                        )}
                        <p className="text-gray-700 font-bold">성별 : {myProfileData.gender}</p>
                        <p className="text-gray-700 font-bold">위치 : {myProfileData.locationCountry}</p>
                    </div>
                </div>
                {editMyProfileState ? (
                    <div className="flex space-x-4">
                        <button onClick={saveIntroduction} className="bg-purple-500 text-white py-2 px-4 mt-4 rounded">
                            저장
                        </button>
                        <button onClick={editProfile} className="bg-purple-500 text-white py-2 px-4 mt-4 rounded">취소</button>
                    </div>
                ) : (
                    <button onClick={editProfile} className="bg-purple-500 text-white py-2 px-4 mt-4 rounded">
                        프로필 수정
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;