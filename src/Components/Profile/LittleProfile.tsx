import { useRecoilValue } from "recoil";
import profile_default from "../../img/profile_default.png";
import { myProfileState } from "../../Recoil/MyProfileAtom";

const LittleProfile:React.FC = () => {
    const myProfileData = useRecoilValue(myProfileState);

    return(
        <div className="flex items-center cursor-pointer p-10 rounded-8 shadow-md transition duration-300 ease-in-out bg-purple-200 border border-purple-400 w-full">
            <img src={myProfileData.imageUrl? myProfileData.imageUrl : profile_default} alt="Profile" className="w-20 h-20 p-3 rounded-full" />
            <div className="flex flex-col text-left">
            <p className='font-bold'>{myProfileData.nickname}</p>
            <p className='font-bold'>{myProfileData.locationCountry}</p>
            </div>
        </div>
    );
}

export default LittleProfile;