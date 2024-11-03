import React ,{ useState,useEffect }from "react";
import { useNavigate } from 'react-router-dom';
import {createNode,createFirstNode }from "../Component/Createnode";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import "../Style/calender.css"
import "../Style/common.css"
import "../Style/createpage.css"
import NaviBar from "./NavigationBar/naviBar";
import Web3 from 'web3';


function Createpage(){

    const [change,setchange] = useState(false);
    
    const [check,setCheck] = useState(false);
    // 회사
    const [company,setcompany] = useState(null);

    // 경력 기간 
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    // 업무 
    const [worklog, setWorklog] = useState(null);


    //메타마스크 계정
    const [account, setAccount] = useState(null);
    //전송금액은 1원으로 고정
    const [amount, setAmount] = useState(1);
    //전송계좌도 고정
    const [receiver, setReceiver] = useState('0x12B8D1c38395196f7D2c410a7D84cd300fCF12B4');

    const currentURL = useNavigate();

    /*전송  */
    const handleConfirm = async () => {
        const newData = [company,startDate,endDate,worklog]
        //const data = block.data;
        const dataString = JSON.stringify(newData);
        const web3 = new Web3(window.ethereum);
        await web3.eth.sendTransaction({
            from: account,
            to: receiver,
            value: web3.utils.toWei(amount, "ether"),
            data: web3.utils.utf8ToHex(dataString)
        });
    };

    /*메타마스크 연결*/
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                // MetaMask 계정 요청
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                console.log('Connected account:', accounts[0]);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    const checckData = async(event) =>{
        event.preventDefault(); 
        const STARTyear = startDate.getFullYear(); // 연도 추출
        const STARTmonth = startDate.getMonth() + 1; // 월 추출 (0부터 시작하므로 +1 필요)
        const STARTday = startDate.getDate()

        const ENDyear = startDate.getFullYear(); // 연도 추출
        const ENDmonth = startDate.getMonth() + 1; // 월 추출 (0부터 시작하므로 +1 필요)
        const ENDday = startDate.getDate()

        const STARTDate = STARTyear + '-' + STARTmonth + '-' + STARTday;
        const ENDDate = ENDyear + '-' + ENDmonth + '-' + ENDday;
        setStartDate(STARTDate);
        setEndDate(ENDDate);
        const response = await axios.post('http://localhost:3001/checkData', {
            username : "박준서",
            worklog : worklog,
            startdate : STARTDate,
            enddate : ENDDate
          });
          console.log(response.data);
          if(response.data.result)
          {
            setCheck(true);
          }
          else{alert("데이터가 일치하지 않습니다.")}
    }
    
    const newCompany = (e) => {
        setcompany(e.target.value)
      }
    
    const newWorklog = (e) => {
        setWorklog(e.target.value)
    }

    useEffect(() => {
        connectMetaMask();
    }, []);
    
    // 데이터 체크하여 맞을 경우 실행
    useEffect(() => {
        if(check){
            handleConfirm();
            currentURL(-1);
        }},[check]);


    useEffect(() =>{
       if(company != null && worklog != null && startDate != null && endDate != null)
        {
            setchange(!change);
        }
    },[company,worklog,startDate,endDate])

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };

    return(
        <div className="home_background">
            <div className="Common_Margin">
                <NaviBar/>
                <div className="formContainer">
                <h1>경력 정보 입력</h1>
                    <form onSubmit={checckData} className="formBox">
                        <div className="Flex_box">
                            <h3>회사</h3>
                            <input type = "text"  onChange = {newCompany} className = "companybox" placeholder="회사이름"></input>
                        </div>
                        <div className="Flex_box">
                            <h3>기간</h3>
                            <DatePicker
                            className="custom_calender"
                            elected={startDate}
                            label = "경력 기간 입력"
                            onChange={onChange}
                            dateFormat="yyyy-MM-dd"
                            startDate={startDate}
                            endDate={endDate}
                            locale={ko}
                            selectsRange/>
                        </div>
                        <div className="Flex_box">
                            <h3>업무 </h3>
                            <input type="textarea" className = "workArea" placeholder="업무 입력" onChange={newWorklog}></input>
                        </div>
                        <button type="submit" className="createbutton">정보생성</button>
                    </form>
                 </div>
            </div>
        </div>
    )


}

export default Createpage;