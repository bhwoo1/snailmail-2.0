import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "./Recoil/TokenAtom";
import Friends from "./Components/Main/Friends";
import Header from "./Header";

const ProtectedRoutes:React.FC = () => {
    const isLogin = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();
    
    if(isLogin) {
        return (
            <>
                <Friends />
                <Header />
                <Outlet />
            </>
        );
    }
    else {
        return <Navigate to="/login" state={{redirectedFrom:currentLocation}} replace/>;
    }
}

export default ProtectedRoutes;