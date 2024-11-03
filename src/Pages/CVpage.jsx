import React, { useState,useEffect } from 'react';
import "../Style/common.css"
import "../Style/CVpage.css"
import Modal from 'react-modal'
import Web3 from 'web3';


function CV({isOpen,onRequestClose}){

    const onClose = ()=>{
        onRequestClose();
    }
    if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
    }
    
    const [careers, setCareers] =useState([]); 
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7547"));

   const Printcareers = careers.map((career, index) => {
         if(index < transactions.length-1){
         return (
        <div>
            <div className='careerflex'>
                <h3>회사이름</h3>
                <p className='careerText'>{career.company}</p>
                <h3>기간</h3>
                <p className='careerText'>{career.startDate}~{career.endDate}</p>
            </div>
            <div>
                 <h3 className="career_box_loghead">업무</h3>
                 <p className="career_box_log">{career.career}</p></div>
        </div>
     );}});

   const fetchAllTransactions = async () => {
     setLoading(true);
     try {
       const allTransactions = await getAllTransactions();
       console.log("All Transactions:", allTransactions);
       setTransactions(allTransactions);
       console.log(careers);
     } catch (error) {
       console.error("Error fetching transactions:", error);
     }
     setLoading(false);
   };

   const fetchData = (transactions) => {
     const newCareersData  = transactions.map((transaction,index)=>{
         console.log("도달");
         if (transaction.input && transaction.input !== '0x'){
             const cleanHexData = transaction.input.slice(2);
             // 3. 16진수를 바이트 배열로 변환
             const byteArray = [];
             for (let i = 0; i < cleanHexData.length; i += 2) {
                 byteArray.push(parseInt(cleanHexData.slice(i, i + 2), 16));
             }
     
             // 4. 바이트 배열을 문자열로 변환
             const decoder = new TextDecoder('utf-8');
             const decodedString = decoder.decode(new Uint8Array(byteArray));
             const jsonData = JSON.parse(decodedString);
             const result =  {
                 company: jsonData[0],
                 startDate: jsonData[1],
                 endDate: jsonData[2],
                 career: jsonData[3]
             };
             careers.push(result);
         }
     });
 }

 
   const getAllTransactions = async () => {
     try {
       const latestBlockNumber = await web3.eth.getBlockNumber();
       let allTransactions = [];
   
       for (let i = 0; i <= latestBlockNumber; i++) {
         const block = await web3.eth.getBlock(i, true);
         if (block && block.transactions) {
           allTransactions = allTransactions.concat(block.transactions);
         }
       }
   
       return allTransactions;
     } catch (error) {
       console.error("Error fetching transactions:", error);
       return [];
     }
   };

    useEffect(() => {
     fetchAllTransactions();
   }, []);

   useEffect(() => {
     if (transactions.length != 0 && careers.length < transactions.length) {
       fetchData(transactions);
     }
   }, [transactions]);









return(
        <Modal isOpen = {isOpen} onRequestClose={onClose} 
        className="Cv_container" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' } }}>
               <span className='Cv_box'>
               <h1>경력서</h1>
                <div className='user_Info'>
                    <h2>개인정보</h2>
                    <p>이름 : 박준서</p>
                    <p>메일 : pankgoshy@naver.com</p>
                    <p>휴대폰 : 010-4106-1264</p>
                    <p>GitHub : https://github.com/Pankgo/portfolio-.git</p>
                </div>
                <div>
                    <h2>경력</h2>
                    {loading ? <div>Loading...</div> :Printcareers}
                </div>
                <div className='user_Info'>
                    <h2>자격증</h2>
                    <p>정보 처리 기사</p>
                    <p>Opic : IH</p>
                </div>
               </span>
              <button onClick={onClose} className='closeButton'>x</button>
        </Modal>
);

}

export default CV;