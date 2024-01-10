import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignInData } from "../../Type";
import { useLoginsubmit } from "./LoginFunction";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "src/Recoil/TokenAtom";

const Login:React.FC = () => {

    const { signInSubmit } = useLoginsubmit(); 

    const [data, setData] = useState<SignInData>({
        email:"",
        password:"",
    });

    const signIn = (e:React.FormEvent) => {
        e.preventDefault();
        signInSubmit(data);
    }

    const navigate = useNavigate();
    const isLogin = useRecoilValue(isLoginSelector);
    const location = useLocation();
    const from = location?.state?.redirectedFrom?.pathname || '/';

    useEffect(() => {
      if(isLogin){
              navigate(from);
      }
      else{
              navigate('/login');
      }    

    }, []);



    return (
        <div className="flex items-center justify-center h-screen">
          <form className="grid gap-4 p-6 max-w-md w-full bg-white rounded-lg shadow-md" onSubmit={signIn}>
            <h2 className="text-3xl font-semibold text-center text-gray-800">로그인</h2>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                이메일
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                비밀번호
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              로그인
            </button>
            <p className="text-center text-gray-600 mt-4">
              아직 회원이 아니세요? <Link to="/register" className="text-violet-500">회원가입</Link>
            </p>
          </form>
        </div>
      );

}

export default Login;