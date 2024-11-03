import React from "react";
import "../../Style/exportbtt.css"
import "../../Style/common.css"
import { Link } from "react-router-dom";

function Exportbtt(){
 return(
    <label className = "btn_container"> <Link to = {`/export`} className="selectHead">전송</Link></label>
 )
}

export default Exportbtt;