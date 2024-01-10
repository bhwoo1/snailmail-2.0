import axios from "axios"
import { User } from "../../Type"
import { useRecoilState } from "recoil"
import { myProfileState } from "../../Recoil/MyProfileAtom";

interface ProfileFunctions {
    getMyProfile: () => void;
    // getUserProfile: (selectedUser: User) => void;
    profilePhotoChange: (event: React.ChangeEvent<HTMLElement>) => void;
    editPhoto: () => void;
    editBio: () => void;
    likeClick: (selectedUser: User) => void;
    dislikeClick: (selectedUser: User) => void;
  }

export const useProfile = ():ProfileFunctions => {
    const [profileData, setProfileData] = useRecoilState(myProfileState);




    // 내 프로필 정보 가져오기
    const getMyProfile = () => {
        axios.get("http://localhost:8080/api/user/my-profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            const { userId, nickname, gender, bio, imageUrl, locationCountry } = res.data;

            setProfileData((prevProfileData) => ({
                ...prevProfileData,
                userId,
                nickname,
                gender,
                bio,
                imageUrl,
                locationCountry,
              }));
              
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // // 유저 프로필 정보 가져오기
    // const getUserProfile = async (selectedUser: User) => {
    //     await axios.get("http://localhost:8080/api/user/profile", {
    //         params: {
    //             targetUserId: selectedUser.userId
    //         },
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //     .then((res) => {
    //         const { userId, nickname, gender, bio, imageUrl, locationCountry, likeScore, hasLikedOrDisliked } = res.data;
    //         setUserProfileData((prevUserProfileData) => ({
    //             ...prevUserProfileData,
    //             userId,
    //             nickname,
    //             gender,
    //             bio,
    //             imageUrl,
    //             locationCountry,
    //             likeScore,
    //             hasLikedOrDisliked
    //         }))  
    

            
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    // 프로필 사진 변경(업로드)
    const profilePhotoChange = (event: React.ChangeEvent<HTMLElement>) => {
        
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.src = e.target?.result as string;

                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = 300;
                    canvas.height = 300;

                    // 이미지를 캔버스에 그림
                    context?.drawImage(image, 0, 0, 300, 300);

                    // 캔버스에서 이미지 데이터를 얻어옴
                    const resizedDataURL = canvas.toDataURL('image/png');

                    // Data URL을 Blob으로 변환
                    fetch(resizedDataURL)
                    .then((res) => res.blob())
                    .then((blob) => {
                        // Blob을 File 객체로 변환하여 상태에 저장
                        const resizedFile = new File([blob], file.name, { type: file.type });
                        const resizedUrl = URL.createObjectURL(resizedFile);

                        console.log(resizedFile);


                        setProfileData((prevProfileData) => ({
                            ...prevProfileData,
                            imageUrl: resizedUrl
                        }));
                    });
                };
            };
            reader.readAsDataURL(file);
        }

    }


    // 서버에 프로필 사진 전송
    const editPhoto = () => {
        console.log(profileData.imageUrl);
        const formData = new FormData();
        formData.append('multipartFile', profileData.imageUrl);
        axios.post('http://localhost:8080/api/user/my-profile/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // 서버에 자기소개 수정 전송
    const editBio = () => {
        axios.post("http://localhost:8080/api/user/my-profile", {
            bio: profileData.bio
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            alert('수정이 완료되었습니다.');
            // 새로고침
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })

    }


    const likeClick = (selectedUser: User) => {
        axios.post("http://localhost:8080/api/user/profile/like", {
            targetUserId: selectedUser.userId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {

        });
    }

    const dislikeClick = (selectedUser: User) => {
        axios.post("http://localhost:8080/api/user/profile/like", {
            targetUserId: selectedUser.userId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then((res) => {
            
        })
        .catch((err) => {
            console.log(err);
        });
    }


    return {
        getMyProfile,
        // getUserProfile,
        profilePhotoChange,
        editPhoto,
        editBio,
        likeClick,
        dislikeClick
    }
}




