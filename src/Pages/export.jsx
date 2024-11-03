import React, { useState,useRef  } from 'react';
import "../Style/common.css"
import "../Style/export.css"
import NaviBar from "./NavigationBar/naviBar";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';

function Export(){


    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('TestEmail', 'Test1264', form.current, 'NYck4Ho1Iti7t9XO_')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

return(
    <div className='home_background'>
        <div className="Common_Margin">
            <NaviBar/>
            <div className='emailContainer'>
                <h1>메일 전송</h1>
                <form ref={form} onSubmit={sendEmail} className='emailBox'>
                    <label>이름</label>
                        <input type="text" name="user_name" className='inputBox'/>
                    <label>이메일</label>
                        <input type="email" name="user_email" className='inputBox'/>
                    <label>메시지</label>
                        <textarea name="message" className='input_message inputBox' placeholder='간단한 자기소개' />
                    <label>공개키</label>
                        <input type="text" name="user_publickey" placeholder='공개키입력' className='inputBox'/>
                    <input className = "submitBtt"type="submit" value="전송" />
                </form>
            </div>
        </div>
    </div>
);

}

export default Export;