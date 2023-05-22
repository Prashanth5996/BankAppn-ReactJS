import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLocation} from 'react-router-dom';
import "./UserForms.css";
interface Balance {
  pinNumber: string;
}
const validationSchema = Yup.object().shape({
  pinNumber: Yup.string()
    .required("PinNumber  can't be left blank")
    .min(6, 'Minimum 6 characters are required')
    .max(6, 'Maximum 6 characters are allowed')
});
export default function Balance() {
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number | undefined>();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const accountnumber= location.state?.accountnumber;
  console.log(accountnumber);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Balance>({
    resolver: yupResolver(validationSchema),
  });
  
  const onSubmit = async (data: Balance) => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:7004/validatePinAndBalance/${accountnumber}`, { pinNumber: data.pinNumber });
      const result = response.data;
      
      if (result.startsWith("Valid user from database") && result.includes("Current balance: ")) {
        const currentBalanceString = result.split("Current balance: ")[1];
        const currentBalance = parseFloat(currentBalanceString);
        setCurrentBalance(currentBalance);
        setSuccessMessage("PIN validated successfully from the database!");
        setErrorMessage("");
      } else {
        setCurrentBalance(undefined);
        setErrorMessage("The PIN you have entered is incorrect");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setCurrentBalance(undefined);
      setErrorMessage("The PIN you have entered is incorrect");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setCurrentBalance(undefined);
    setSuccessMessage("");
    setErrorMessage("");
  };
  const handleNumberButtonClick = (num: number) => {
    const pinNumberInput = document.getElementById(
      "pinNumber"
    ) as HTMLInputElement;
    const newPinNumber = pinNumberInput.value + num;
    pinNumberInput.value = newPinNumber;
  };

  const handleResetButtonClick = () => {
    reset();
    setCurrentBalance(undefined);
  };
  return (
    <div id='m6'>
       <div className="container mt-2">  
       <center><u><h2>Balance And History</h2></u> </center>{" "}
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div className="form-register">
    <form onSubmit={handleSubmit(onSubmit)}>
      <p></p><center>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1633497370" width="30px" alt="Error"></img>&nbsp;&nbsp;&nbsp;&nbsp;
            HDFC BANK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button
        type="submit"
        disabled={loading}
        className="btn btn-success btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#box1"
      >
        {loading ? "Loading..." : "Check Balance"}
      </button>
      <p></p>
      <div className="modal" id="box1">
        <div className="modal-dialog-sm modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <label className="modal-title">Verify PIN</label>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                  <div className="form-group">
                  <label htmlFor="pinNumber">ENTER 6-DIGIT PIN</label><p></p>
                  <input
                    type="text"   id="pinNumber"
                    {...register('pinNumber')} onChange={() => { setCurrentBalance(undefined); setSuccessMessage(""); setErrorMessage("");}}
                    className={`form-control ${errors.pinNumber?.message ? 'is-invalid' : ''}`}
                  />
                  <span>{errors.pinNumber?.message}</span>
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
               <button type="button" id="m7" className="fa fa-close" style={{color:"red",backgroundColor:"rgba(255, 0, 0, 0.5)"}} onClick={handleResetButtonClick}></button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="m7" className="fa fa-zero" style={{backgroundColor:"rgba(255, 140, 0, 0.8)"}} onClick={() => handleNumberButtonClick(0)}>0</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit" id="m7"className="fa fa-check-circle" style={{color:"green",backgroundColor:" rgba(0, 128, 0, 0.5)"}} disabled={loading}></button></center>
                </div>
                <p></p>
                {errorMessage && <p className="span">{errorMessage}</p>}
                  {currentBalance !== undefined && <label>Current balance : &nbsp;<button id="m8" className="fa fa-rupee">&nbsp;{currentBalance}</button></label>}<p></p>
              </div>
                    </div>
                </div>
            </div></center>
    </form>
    </div>
      </div>
      </div>
  );
}


