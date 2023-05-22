import React, { useState } from 'react';
import './Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
const Home = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [isLoanClicked, setIsLoanClicked] = useState<boolean>(false);
  const [isLoanImageVisible, setIsLoanImageVisible] = useState<boolean>(false);
  const [isOffersClicked, setIsOffersClicked] = useState<boolean>(false);
  const [isOffersImageVisible, setIsOffersImageVisible] = useState<boolean>(false);
  const [isContactUSClicked, setIsContactUSClicked] = useState<boolean>(false);
  const [isContactUSImageVisible, setIsContactUSImageVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  
  const handleLoanClick = () => {
    setSelectedButton("Button 2");
    setIsLoanClicked(true);
    setIsLoanImageVisible(true);
  };
  const handleOffersClick = () => {
    setSelectedButton("Button 3");
    setIsOffersClicked(true);
    setIsOffersImageVisible(true);
  };
  const handleContactUSClick = () => {
    setSelectedButton("Button 4");
    setIsContactUSClicked(true);
    setIsContactUSImageVisible(true);
  };
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((index - 1 + 3) % 3);
  };

  const handleNext = () => {
    setIndex((index + 1) % 3);
  };
  const navigateToUser = () => {
    navigate('/userlogin');
  };
  const navigateToAdmin = () => {
    navigate('/adminlogin');
  };
  return (
    <body className='home-body'>
      <div className="Slider">
        <div className={`Dashboard ${isDashboardOpen ? "" : "closed"}`}>
          <button
            className="toggle-btn"
            onClick={toggleDashboard}
            style={{ width: '108%' ,backgroundColor:"#696969"}}
          >
            {isDashboardOpen ? (
              <><span className="fa fa-times"></span></>
            ) : (
              <span className="fa fa-bars"></span>
            )}
          </button>
          <p></p>
          <button
            className="fa fa-home"
            style={{width:'108%', color:"white",backgroundColor:"#696969"}}
            onClick={() => {
              setSelectedButton("Button 1");
              setIsLoanImageVisible(false);
              setIsOffersImageVisible(false);
              setIsContactUSImageVisible(false);
            }}
          >
            <a style={{color:"black"}}>{isDashboardOpen ? " Home" : ""}</a>
          </button>
          <p></p>
          <button
            className="fas fa-user" style={{width:'108%',color:"Purple",backgroundColor:"#696969"}}
            onClick={() => {
                handleButtonClick("Button 5");
                navigateToUser();
              }}
          >
            <a style={{color:"black"}}>{isDashboardOpen ? " User Login" : ""}</a>
          </button>
          <p></p>
          <button
            className="fas fa-user-lock" style={{width:'120%',color:"red",backgroundColor:"#696969"}}
            onClick={() => {
                handleButtonClick("Button 6");
                navigateToAdmin();
              }}
          >
            <a style={{color:"black"}}>{isDashboardOpen ? " Admin Login" : ""}</a>
          </button>
        </div>
        <div
          className="Content"
          style={{
            borderTop: "40px solid  rgb(252, 0, 134)",
            width: "100%",
            padding: "20px",
            position: "relative",
            backgroundColor: isLoanImageVisible || isOffersImageVisible || isContactUSImageVisible? "white" : " #c2ec05",
          }}
        >
            {selectedButton === "" && (
            <div>
              <img src="https://www.infomediasearch.com/media/post/2017/6/5/hdfc-bank-tirupur15845567496-img.JPG" alt="menu" style={{ height: '370px', width: isDashboardOpen ? '946px' : '1066px' }}></img>
                      <div style={{ position: 'relative' }}>
                      {index === 0 && (
                        <img src="https://sonikatravels.files.wordpress.com/2020/10/68021025651281.55f2cb8ae79f4.jpg" alt="slider" 
                        style={{ height: '550px', width: isDashboardOpen ? '946px' : '1066px',marginTop:"10px" }} />
                      )}
                      {index === 1 && (
                        <img src="https://sonikatravels.files.wordpress.com/2020/10/25960925651281.55f2cb8ae8b2a.jpg" alt="slider"
                        style={{ height: '550px', width: isDashboardOpen ? '946px' : '1066px',marginTop:"10px" }} />
                      )}
                      {index === 2 && (
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3wdixRxyYq7akoEQAeDdDLLP7qGDZd6G8A&usqp=CAU" alt="slider"
                        style={{ height: '550px', width: isDashboardOpen ? '946px' : '1066px',marginTop:"10px" }} />
                      )}
                      <button onClick={handlePrev} className='fas fa-chevron-left' style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', backgroundColor: 'transparent', color: 'black', opacity: 0.5, border: 'none', padding: 0, fontSize: '30px' }}></button>
                      <button onClick={handleNext} className='fas fa-chevron-right' style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', backgroundColor: 'transparent', color: 'black', opacity: 0.5, border: 'none', padding: 0, fontSize: '30px' }}></button>
                    </div>
            </div>
          )}
          {selectedButton === "Button 1" && (
            <div>
              <img src="https://www.infomediasearch.com/media/post/2017/6/5/hdfc-bank-tirupur15845567496-img.JPG" alt="menu" style={{ height: '370px', width: isDashboardOpen ? '946px' : '1066px' }}></img>
                      <div style={{ position: 'relative' }}>
                      {index === 0 && (
                        <img src="https://sonikatravels.files.wordpress.com/2020/10/68021025651281.55f2cb8ae79f4.jpg" alt="slider" 
                        style={{ height: '550px', width: isDashboardOpen ? '946px' : '1066px',marginTop:"10px" }} />
                      )}
                      {index === 1 && (
                        <img src="https://sonikatravels.files.wordpress.com/2020/10/25960925651281.55f2cb8ae8b2a.jpg" alt="slider"
                        style={{ height: '550px', width: isDashboardOpen ? '946px' : '1066px',marginTop:"10px" }} />
                      )}
                      {index === 2 && (
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3wdixRxyYq7akoEQAeDdDLLP7qGDZd6G8A&usqp=CAU" alt="slider"
                        style={{ height: '550px', width: isDashboardOpen ? '946px' : '1066px',marginTop:"10px" }} />
                      )}
                      <button onClick={handlePrev} className='fas fa-chevron-left' style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', backgroundColor: 'transparent', color: 'black', opacity: 0.5, border: 'none', padding: 0, fontSize: '30px' }}></button>
                      <button onClick={handleNext} className='fas fa-chevron-right' style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', backgroundColor: 'transparent', color: 'black', opacity: 0.5, border: 'none', padding: 0, fontSize: '30px' }}></button>
                    </div>
            </div>
          )}
          {selectedButton === "Button 2" && (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZxPKwbhkIeRJ5j0tO-gxIK4mTHpU9VnwyQ&usqp=CAU"
              alt="Loan Image"
              style={{
                height: '940px',
                width: isDashboardOpen ? '946px' : '1066px',
                marginTop:"4px",
              }}
            />
          )}
           {selectedButton === "Button 3" && (
            <img
            src="https://sonikatravels.files.wordpress.com/2020/10/dae3116877953.55f2cf1facb9a.jpg"
            alt="Offers Image"
            style={{
              height: '940px',
              width: isDashboardOpen ? '946px' : '1066px',
              marginTop:"4px"
            }}
          />
          )}
           {selectedButton === "Button 4" && (
            <>
            <div style={{ textAlign: "center", position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "95%"}}>
              <h1 style={{ fontSize: "3rem",marginBottom:"51%", fontWeight: "bold", color: "black" }}>We are here to Make Banking More Comfortable for You.</h1>
            </div>
            <img
              src="https://www.bankofbaroda.in/-/media/project/bob/countrywebsites/india/contact-us/nri-icon/contact-us-bg.jpg"
              alt="Contact Us Image"
              style={{
                height: "350px",
                width: isDashboardOpen ? "946px" : "1066px",
                marginTop: "4px",
                opacity: isContactUSImageVisible ? 0.5 : 1, 
              }}
            /><center>
            <p></p><div>HDFC Bank Customer Care Number<a className='text'><br></br> 1800 202 6161 / 1860 267 6161 <br></br>(Accessible across India)</a><p></p> Customers travelling abroad can reach us on <a className='text'>+9122 61606160</a><p></p>
                Customers of Imperia Account, Diners Black Credit Card and Infinia Credit Card can reach us on our dedicated Customer Care Number <a className='text'>+9122 61717606</a><p></p>
                Get in touch with us for your Banking needs on our helpline number. Now you can get access to your Bank Accounts, Credit Cards, Loans, Demat Account services over the call.<p></p>
                Phone numbers and email addresses mentioned here are the only Customer Care numbers of HDFC Bank, which you should use. Please do not use any other since these may put you at risk of fraud.<p></p>
                <a style={{color:"red"}}>Note</a> - Charges may be applicable as per your tariff plan with your service provider</div></center>
            </>
          )}
          <div><img
              src="data:image/png;base64,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"
              alt="Hdfc Image"
              style={{ position: "absolute", top: "-42px", right: "32px",margin:"1vh",height:"30px"}}
            /></div>
          {selectedButton === "Button 5" && (
            <></>
          )}
          {selectedButton === "Button 6" && (
           <></>
          )}
          <button
            className='fas fa-money-check-alt'
            style={{
              position: "absolute",
              top: "-42px",
              right: "850px",
              margin:"1vh",
              backgroundColor:"rgba(255, 140, 0, 3.8)",
              fontSize: "1.0rem",
              color: "green",
            }}
            onClick={handleLoanClick}
          >
            &nbsp;<a style={{color:"black"}}>Loan</a>
          </button>
          <button
            className='fas fa-tag'
            style={{
              position: "absolute",
              top: "-42px",
              right: "640px",
              margin:"1vh",
              backgroundColor:"rgba(255, 140, 0, 3.8)",
              fontSize: "1.0rem",
              color: "yellow"
            }}
            onClick={handleOffersClick}
          >
            &nbsp;
            <a style={{color:"black"}}>Offers</a>
          </button>
          <button
            className='fas fa-address-book'
            style={{
              position: "absolute",
              top: "-42px",
              right: "378px",
              margin:"1vh",
              backgroundColor:"rgba(255, 140, 0, 3.8)",
              fontSize: "1.0rem",
              color: "navy"
            }}
            onClick={handleContactUSClick}
          >
            &nbsp;<a style={{color:"black"}}>Contact Us</a>
          </button>
        </div>
      </div>
    </body>
  );
};

export default Home;
