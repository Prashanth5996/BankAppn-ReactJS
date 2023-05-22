import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./UserForms.css";
import { useLocation} from 'react-router-dom';
interface FormData {
  fullname:string;
  accountnumber2:number;
  credit:number;
}

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("First name can't be left blank")
    .min(4, 'Minimum 4 characters are required')
    .max(15, 'Maximum 15 characters are allowed'),
  accountnumber2:Yup.string().required("Target Account Number cant left Blank"),
  credit:Yup.string().required("Please Enter Your Amount")
});

export const Transfer = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const location = useLocation();
    const accountnumber= location.state?.accountnumber;
    console.log(accountnumber);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onClickInput = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const onSubmit = (data: FormData) => {
    axios
      .post(`http://localhost:7004/transfer/${accountnumber}`, data)
      .then((posRes) => {
        setSuccessMessage('Your Amount Transfered Succesfully...!');
        setErrorMessage(null);
        console.log(posRes);
      })
      .catch((errRes) => {
        setSuccessMessage(null);
        setErrorMessage('Something went wrong, please try again later.');
        console.log(errRes);
      });
  };

  return (
    <>
        <div id='m4'>
       <div className="container mt-4">
       <center><u><h2>Transfer Account</h2></u></center>   
      <div className="form-register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Tranget Account Number</label>
            <input
              type="text"
              {...register('accountnumber2')}
              className={`form-control ${errors.accountnumber2?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.accountnumber2?.message}</span>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register('fullname')}
              className={`form-control ${errors.fullname?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.fullname?.message}</span>
          </div>

          <div className="form-group">
            <label>Transfer Amount</label>
            <input
              type="number"
              {...register('credit')}
              className={`form-control ${errors.credit?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.credit?.message}</span>
          </div>

          <div className="form-group"><center>
            <button type="submit" className="btn btn-success mx-5">
              Transfer
            </button>
            <button type="reset" className="btn btn-danger mx-3" onClick={() => reset()}>
              Reset
            </button></center>
            <p></p>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          </div>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};
