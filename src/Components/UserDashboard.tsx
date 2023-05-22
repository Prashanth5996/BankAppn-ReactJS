import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Balance from "./Balance";
import Statements from "./Statements";
import { Transfer } from "./Transfer";
import './userdash.css';
const UserDashboard = () => {
  const location = useLocation();
  const [accountnumber, setAccountNumber] = useState(location.state?.accountnumber|| null);
  console.log(accountnumber);
  const navigate = useNavigate();
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleUserClick = () => {
    setShowLogout(!showLogout);
  };
  const handleLogout = () => {
    setAccountNumber(null); // Reset the userId to null on logout
    navigate('/', { replace: true }); // Navigate to the Home component and replace the current page from the history
  };
    return (
      <body className='dash-body'>
        <div className="h1">
          <div>
            <h2 className="message">
              <img src="https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1633497370" width="30px" alt="Error"></img>&nbsp;&nbsp;&nbsp;WELCOME TO HDFC BANK</h2>
          </div>
        </div>
        <div className='user user-dash'>
        <div className="Slider">
        <div className={`Dashboard ${isDashboardOpen ? "" : "closed"}`}>
          <button className="toggle-btn" onClick={toggleDashboard}style={{width:'108%',backgroundColor:" rgb(147, 197, 8)"}} >
            {isDashboardOpen ? (
              <>
                <span className="fa fa-times"></span>
              </>
            ) : (
              <span className="fa fa-bars"></span>
            )}
          </button>
          <p></p>
          <button
            className="fas fa-wallet" style={{width:'108%',color:"brown",backgroundColor:" rgb(147, 197, 8)"}}
            onClick={() => handleButtonClick("Button 1")}
          >
            <a style={{color:"black"}}>{isDashboardOpen ? " Balance" : ""}</a>
          </button>
          <p></p>
          <button
            className="fa fa-exchange" style={{width:'108%',color:"deeppink",backgroundColor:" rgb(147, 197, 8)"}}
            onClick={() => handleButtonClick("Button 2")}
          >
            <a style={{color:"black"}}>{isDashboardOpen ? " Transfer" : ""}</a>
          </button>
          <p></p>
          <button
            className="fa fa-file-text-o" style={{width:'108%',color:"darkblue",backgroundColor:" rgb(147, 197, 8)"}}
            onClick={() => handleButtonClick("Button 3")}
          >
            <a style={{color:"black"}}>{isDashboardOpen ? " Statement" : ""}</a>
          </button>
        </div>
        <div className="Content" style={{ borderTop: "40px solid rgb(255, 145, 0)", width: "100%", padding: "20px", position: "relative",marginTop:"-1px" }}>
          <button className="fa fa-user-circle" style={{ position: "absolute", top: "-42px", right: "32px",margin:"1vh", borderRadius: "50%", fontSize: "1.0rem", backgroundColor: "rgb(0, 250, 217)", color: "white" }} onClick={handleUserClick}>
          </button>
          {showLogout && (
            <button className="fa fa-sign-out" onClick={handleLogout} style={{ position: "absolute", top: "8px", right: "5px",margin:"1vh", borderRadius: "5px", fontSize: "1.0rem", backgroundColor: "burlywood", color: "white" }}>
              &nbsp;Logout
            </button>
          )}
          <div className={`ButtonContent ${selectedButton !== "" ? "" : "hidden"}`}>
            {selectedButton === "Button 1" && (
              <div>
                <Balance></Balance>
              </div>
            )}
            {selectedButton === "Button 2" && (
              <div>
                <Transfer></Transfer>
              </div>
            )}
            {selectedButton === "Button 3" && (
              <div>
                <Statements></Statements>
              </div>
            )}
          </div>

          </div>
        </div>
      </div>
      </body>
      );
};

export default UserDashboard;