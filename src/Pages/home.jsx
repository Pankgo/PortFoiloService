import React from "react";
import "../Style/home.css"
import "../Style/common.css"
import NaviBar from"./NavigationBar/naviBar"
import Exportbtt from "./ExportButton/exportbtt"
function Home() {
    return (
        <div className="home_background">
            <div className="Common_Margin">
                <NaviBar/>
                <Exportbtt/>
                <h1 className="home_HeadTxT">ChainCV</h1>
            </div>
        </div>
    );
}

export default Home;