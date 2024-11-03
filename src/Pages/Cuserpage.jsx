import React ,{useCallback, useEffect, useState} from "react";
import NaviBar from"./NavigationBar/naviBar"
import CV from"./CVpage"
import "../Style/common.css"
import "../Style/Cuser.css"
import Web3 from 'web3';
import  "./CVpage";
function Cuserpage(){
    const [publickey, setpublickey] = useState(null);
    const [check,setCheck] = useState(false);
    const [account,setaccounts] = useState([]);

  

    const web3 = new Web3('http://localhost:7547');

    // 비동기 함수로 계정 가져오기
    const getAccounts = async() => {
        try {
            // 가나슈에서 생성된 계정 가져오기
            const result = await web3.eth.getAccounts();
            setaccounts(result);
            console.log('Available accounts:', result);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }
    
    const newPublickey = (e) =>{
        setpublickey(e.target.value);
    }

    const handleCheck = (e)=>{
        e.preventDefault();
        for(var i = 0; i < account.length; i++){
            if(account[i] == publickey){
                setCheck(true);
                return;
            }
        }
        alert("공개키가 틀렸습니다.");
    };

    const closeModal = () =>{
        setCheck(false);
        console.log("도달");
    };

    useEffect(() => {
        getAccounts();
    }
    ,[])


    return(
        <div className="home_background">
            <div className="Common_Margin ">
                <NaviBar/>
                <div className="formContainer">
                    <h1>이력서 확인</h1>
                    <form onSubmit={handleCheck} className="checkContainer">
                        <input type = "text" className="checkBox" onChange ={newPublickey} placeholder="공개키입력" id ="inputbox"/>
                        <input type = "submit" value="공개키체크" className="checkBox checkButton"/>
                    </form>
                    <CV isOpen={check} onRequestClose={closeModal}></CV>
                </div>
            </div>
        </div>
    );
}


export default Cuserpage;