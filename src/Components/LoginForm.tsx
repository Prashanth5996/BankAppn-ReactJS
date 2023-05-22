import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './AdminLogin.css';

interface Balance {
  pinNumber: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
  
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onClickInput = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };
  const handleNumberButtonClick = (num: number) => {
    const pinNumberInput = document.getElementById(
      "pinNumber"
    ) as HTMLInputElement;
    const newPinNumber = pinNumberInput.value + num;
    pinNumberInput.value = newPinNumber;
  };  
  return (
    <body>
     <form>
      <p></p><center>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1633497370" width="30px" alt="Error"></img>&nbsp;&nbsp;&nbsp;&nbsp;
            HDFC BANK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button
        type="submit"
        className="btn btn-success btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#box1"
      >Check Balance
      </button>
      <p></p>
      <div className="modal" id="box1">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Verify PIN</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                  <div className="form-group">
                  <label htmlFor="pinNumber">ENTER 6-DIGIT PIN</label><p></p>
                  <input
                    type="text"   id="pinNumber"
                    {...register('pinNumber')} 
                    className={`form-control ${errors.pinNumber?.message ? 'is-invalid' : ''}`}
                  />
              
                </div>
                <p></p>
                <div><center>
                <button type="button" id="m7"className="fa fa-one" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(1)}>1</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7" className="fa fa-two" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(2)}>2</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7" className="fa fa-three" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(3)}>3</button>
                    <p></p>
                <button type="button" id="m7" className="fa fa-four" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(4)}>4</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7" className="fa fa-five" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(5)}>5</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7" className="fa fa-six" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(6)}>6</button>
                    <p></p>
               <button type="button" id="m7" className="fa fa-seven" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(7)}>7</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7"className="fa fa-eight" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(8)}>8</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7" className="fa fa-nine" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(9)}>9</button>
                    <p></p>
               <button type="button" id="m7" className="fa fa-close" style={{color:"red",backgroundColor:"rgba(255, 0, 0, 0.5)"}}></button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7" className="fa fa-zero" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(0)}>0</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit" id="m7"className="fa fa-check-circle" style={{color:"green",backgroundColor:" rgba(0, 128, 0, 0.5)"}}></button></center>
                </div>
                <p></p>
                  {errorMessage && <p>{errorMessage}</p>}
              </div>
                        <div className="modal-footer"><p></p>
                        
                        </div>
                    </div>
                </div>
            </div></center>
    </form>
    </body>
  );
};

export default LoginForm;
