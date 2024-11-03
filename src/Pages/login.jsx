import React, { useState } from 'react';
import "../Style/login.css"
import "../Style/common.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
   
        const currentURL = useNavigate(); //현재 url 주소 가져오기


        const Idtype = (e) => {
          setUserId(e.target.value)
        }
        const Passwordtype = (e) => {
            setPassword(e.target.value)
        }

        const logincheck = async () => {
            try {
              console.log(userId,password);
              const response = await axios.post('http://localhost:3001/login', {
                loginId: userId,
                password: password,
              });
              console.log(response.data);

              if (response.data.result) {
                  // 로그인 성공 시 홈페이지로 이동
                  currentURL("/home");
              } else {
                  // 로그인 실패 시 팝업으로 메시지 표시
                  alert('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.');
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
        
          const handleLogin = (e) => {
            e.preventDefault(); // 폼의 기본 동작 막기
            logincheck();
          };
        


    return (
          <div className='login_background'>
                <div className='logincontainer'>
                  <form onSubmit={handleLogin}>
                      <h1 className='loginHead'>Sign In</h1>
                      <input type = "text"  onChange = {Idtype} className = "loginbox" placeholder="  이름"></input>
                      <input type = "password" onChange = {Passwordtype} className = "loginbox" placeholder="  개인키입력"></input>
                      <button type = "submit" className="loginbutton">signIn</button> 
                  </form>
                </div>
            </div>
    );
}
export default Login