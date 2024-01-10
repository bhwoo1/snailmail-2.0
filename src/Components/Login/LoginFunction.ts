import axios, { AxiosRequestConfig } from "axios";
import { SignInData, SignUpData } from "../../Type";
import { useSetRecoilState } from "recoil";
import { TokenAtom } from "../../Recoil/TokenAtom";
import { useNavigate } from "react-router-dom";

// 반환 타입을 위한 인터페이스 정의
interface LoginSubmitFunctions {
  signUpsubmit: (data: SignUpData) => void;
  signInSubmit: (data: SignInData) => void;
  signOut: () => void;
}

export const useLoginsubmit = (): LoginSubmitFunctions => {
    const setAccessToken = useSetRecoilState(TokenAtom);
    const navigate = useNavigate();

    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: false,
    };
    
    // 회원가입
    const signUpsubmit = (data: SignUpData) => {
        axios.post("http://localhost:8080/api/user/signup", {
            nickname: data.nickname,
            email: data.email,
            password: data.password,
            gender: data.gender
        }, config)
        .then((res) => {
            alert("회원가입 성공");
            navigate('/login');
        })
        .catch((err) => {
            console.log(err);
            alert("회원가입에 실패했습니다.");
        });
    };


    // 로그인
    const signInSubmit = (data: SignInData) => {
        axios.post("http://localhost:8080/api/user/login", {
            email: data.email,
            password: data.password
        }, config)
        .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            setAccessToken(res.data.accessToken);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
            alert("로그인에 실패했습니다.");
        });
    };

    const signOut = () => {
        localStorage.removeItem('accessToken'); // 액세스토큰 제거
        localStorage.removeItem('selectedUser');
        navigate('/login'); // 로그인 화면으로 이동
        window.location.reload();
    }

    return {
        signUpsubmit,
        signInSubmit,
        signOut
    };
};
 