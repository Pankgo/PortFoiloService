import React from "react";
import "../Style/selectInfo.css"
import "../Style/common.css"
import { Link } from "react-router-dom";
function SelectInfo() {
    return (
        <div className="Common_Margin">
            <h1>정보 선택</h1>
            <div className="Flex_Box">
                <div className="select">
                    <h3 className="schoolText">학력</h3>
                </div>
                <Link to = {`/showCareer`} className="select">
                    <h3 className="workText">경력</h3>
                </Link>
            </div>
            <div className="Flex_Box">
                <div className="select">
                    <h3 className="certificateText">자격증</h3>
                </div>
                <div className="select">
                    <h3 className="volunteerText">봉사활동</h3>
                </div>
            </div>
        </div>
    );
}

export default SelectInfo;