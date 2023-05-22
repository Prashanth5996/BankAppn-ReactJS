import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './admindash.css';
import { AccountOpening } from './AccountOpening';
import { Deposit } from './Deposit';
import { Withdraw } from './Withdraw';
import { CloseAc } from './CloseAc';
import GetAllDetailsUserData from './GetAllDetailsUserData';
const AdminDashboard = () => {
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
        <div className='admin'>
        <div className="Slider">
        <div className={`Dashboard ${isDashboardOpen ? "" : "closed"}`} >
          <button className="toggle-btn" onClick={toggleDashboard} style={{width:'108%'}}>
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
            className="fas fa-user-plus" style={{width:'108%'}}
            onClick={() => handleButtonClick("Button 1")}
          >
            {isDashboardOpen ? " Account Opening" : ""}
          </button>
          <p></p>
          <button
            className="fas fa-money-check-alt" style={{width:'108%'}}
            onClick={() => handleButtonClick("Button 2")}
          >
            {isDashboardOpen ? " Deposit Amount" : ""}
          </button>
          <p></p>
          <button
            className="fas fa-money-bill-wave" style={{width:'108%'}}
            onClick={() => handleButtonClick("Button 3")}
          >
           <br></br>
            {isDashboardOpen ? " Withdraw Amount" : ""}
          </button>
          <p></p>
          <button
            className="fas fa-user-times" style={{width:'108%'}}
            onClick={() => handleButtonClick("Button 4")}
          >
           <br></br>
            {isDashboardOpen ? " Close Account" : ""}
          </button>
          <p></p>
          <div>
                   <button
                      className="fas fa-clipboard-list" style={{width:'108%'}} data-bs-toggle="modal" data-bs-target="#box2"
                      onClick={() => handleButtonClick("Button 5")}
                    >
                    <br></br>
                      {isDashboardOpen ? " Get All Data" : ""}
                    </button>
                      <div className="modal" id="box2">
                        <div className="modal-dialog modal-fullscreen">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="fullscreenModalLabel">GETALL_RECORDS</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <GetAllDetailsUserData></GetAllDetailsUserData>
                            </div>
                            <div className="modal-footer">
                            </div>
                          </div>
                        </div>
                      </div>
            </div>
        </div>
        <div className="Content" style={{ borderTop: "40px solid rgb(1, 114, 114)", width: "100%", padding: "20px", position: "relative" }}>
          <button className="fa fa-user-circle" style={{ position: "absolute", top: "-42px", right: "32px",margin:"1vh", borderRadius: "50%", fontSize: "1.0rem", backgroundColor: "rgb(252, 252, 94)", color: "red" }} onClick={handleUserClick}>
          </button>
          {showLogout && (
            <button className="fa fa-sign-out" onClick={handleLogout} style={{ position: "absolute", top: "8px", right: "5px",margin:"1vh", borderRadius: "5px", fontSize: "1.0rem", backgroundColor: "burlywood", color: "white" }}>
              &nbsp;Logout
            </button>
          )}
          <div className={`ButtonContent ${selectedButton !== "" ? "" : "hidden"}`}>
            {selectedButton === "Button 1" && (
              <div>
                <AccountOpening></AccountOpening>
              </div>
            )}
            {selectedButton === "Button 2" && (
              <div>
                <Deposit></Deposit>
              </div>
            )}
            {selectedButton === "Button 3" && (
              <div>
                  <Withdraw></Withdraw> 
              </div>
            )}
             {selectedButton === "Button 4" && (
              <div>
                   <CloseAc></CloseAc> 
              </div>
            )}
              {selectedButton === "Button 5" && (
              <div>
                   
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
      </body>
      );
};

export default AdminDashboard;