import { useState } from "react";
import { SignUpData } from "../../Type";
import { Link } from "react-router-dom";
import { useLoginsubmit } from "./LoginFunction";

const Register:React.FC = () => {

    const { signUpsubmit } = useLoginsubmit();

    const [data, setData] = useState<SignUpData>({
        email:"",
        password:"",
        nickname:"",
        gender:""
    });

    const signUp = (e:React.FormEvent) => {
        e.preventDefault();
        signUpsubmit(data);
    }

    

    return (
        <div className="flex items-center justify-center h-screen">
          <form className="grid gap-4 p-6 max-w-md w-full bg-white rounded-lg shadow-md" onSubmit={signUp}>
            <h2 className="text-3xl font-semibold text-center text-gray-800">회원가입</h2>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickname">
                    닉네임
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="닉네임을 입력하세요."
                    value={data.nickname}
                    onChange={(e) => setData({ ...data, nickname: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    이메일
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="이메일을 입력하세요."
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    비밀번호
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
              <label>
                <input
                  type="radio"
                  value="남성"
                  onChange={() => setData({ ...data, gender: '남성' })}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  value="여성"
                  onChange={() => setData({ ...data, gender: '여성' })}
                />
                여성
              </label>
              <label>
                <input
                  type="radio"
                  value="기타"
                  onChange={() => setData({ ...data, gender: '기타' })}
                />
                기타
              </label>
            </div>
            <button
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              회원가입
            </button>
            <p className="text-center text-gray-600 mt-4">
              이미 회원이세요? <Link to="/login" className="text-violet-500">로그인</Link>
            </p>
          </form>
        </div>
      );

}

export default Register;