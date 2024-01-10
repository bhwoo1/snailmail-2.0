import React, { useEffect } from 'react';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Home from './Components/Main/Home';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import { useSetRecoilState } from 'recoil';
import { TokenAtom } from './Recoil/TokenAtom';
import MyProfile from './Components/Profile/MyProfile';
import LetterList from './Components/Letter/LetterList';
import Users from './Components/Main/Users';



const App:React.FC = () => {
  const setToken = useSetRecoilState(TokenAtom);


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken !== null) {
      setToken(accessToken as string); // TokenAtom을 통해 Recoil 상태를 업데이트
    }
}, [setToken]);

  

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path='/users' element={<Users />} />
          <Route path={`/letters`} element={<LetterList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
