import { Link } from "react-router-dom";
import { useLoginsubmit } from "./Components/Login/LoginFunction";

const Header:React.FC = () => {
    const {signOut} = useLoginsubmit();


    const logoutBtnClick = () => {
        signOut();
    }


    return(
        <div className="block fixed right-0 my-4 bg-purple-200 p-4 w-5/6 border border-purple-500 z-20">
            <div className="container mx-auto flex items-center justify-end">
                <Link to="/users"><button className="block relative bg-violet-400 text-white text-center p-2 md:p-4 rounded-5 border border-purple-700 ml-10">친구 찾기</button></Link>
                <button onClick={logoutBtnClick} className="block relative bg-red-400 text-white text-center p-2 md:p-4 rounded-5 border border-red-700 ml-10">로그아웃</button>
            </div>
        </div>
    );
}

export default Header;