import React from "react";
import "../Style/common.css"
import "../Style/showCareer.css"
import { useEffect, useState} from 'react'
import NaviBar from"./NavigationBar/naviBar"
import Web3 from 'web3';

function ShowCarrer()
{
       const [careers, setCareers] =useState([]); 
       const [loading, setLoading] = useState(true);
       const [transactions, setTransactions] = useState([]);

       const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7547"));

      const Printcareers = careers.map((career, index) => {
            return (
                <div className="careerbox" key={index}>
                    <div className="flex_container">
                        <div className="career_box_company">
                            <h3>회사이름</h3>
                            <p>{career.company}</p>
                        </div>
                        <div className="career_box_term">
                            <h3>경력</h3>
                            <p>{career.startDate}~{career.endDate}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="career_box_loghead">업무</h3>
                        <p className="career_box_log">{career.career}</p>
                    </div>
                    <img src = "check1.jpg"className="careerimg"/>
                </div>
        );});

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
        if (transactions.length != 0 && careers.length <= transactions.length) {
          console.log(transactions);
          fetchData(transactions);
        }
      }, [transactions]);

    return(
        <div className="home_background">
            <div className="Common_Margin ">
                <NaviBar/>
                <div className="careerContainer">
                <h1>경력 정보</h1>
                {loading ? <div>Loading...</div> : Printcareers}
                </div>
            </div>
        </div>
    )
}

export default ShowCarrer;