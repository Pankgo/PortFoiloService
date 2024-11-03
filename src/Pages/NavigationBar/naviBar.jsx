import React from "react";
import "../../Style/navibar.css"
import "../../Style/common.css"
import { Link } from "react-router-dom";
function NaviBar() {
    return (
                <div className="N_bar">
                        <Link to = {`/`} className="selectHead HomeTxt"  >ChainCv</Link>
                        <div className="dropdown">
                            <span className="selectTxt">정보 확인</span>
                            <div className="dropdown-content">
                                <a href="#">학력</a>
                                <Link to = {`/showCareer`} >경력</Link>
                                <a href="#">자격증</a>
                                <a href="#">봉사활동</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="selectTxt">정보추가</span>
                            <div className="dropdown-content">
                                <a href="#">학력</a>
                                <Link to = {`/createpage`} >경력</Link>
                                <a href="#">자격증</a>
                                <a href="#">봉사활동</a>
                            </div>
                        </div>
                        <Link to = {`/Cuser`} className="selectTxt selectHead" >회사전용</Link>
                </div>


    );
}

export default NaviBar;