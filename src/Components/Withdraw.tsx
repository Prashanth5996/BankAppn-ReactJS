import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./AdminForms.css";
interface FormData {
  accountnumber:number;
  fullname:string;
  debit:number;
}

const validationSchema = Yup.object().shape({
  accountnumber:Yup.string().required("Account Number cant left Blank"),
  fullname: Yup.string()
    .required("First name can't be left blank")
    .min(4, 'Minimum 4 characters are required')
    .max(20, 'Maximum 20 characters are allowed'),
  debit:Yup.string().required("Please Enter Your Amount")
});

export const Withdraw = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const onClickInput = () => {
      setSuccessMessage(null);
      setErrorMessage(null);
    };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormData) => {
    axios
      .post('http://localhost:7004/withdraw', data)
      .then((posRes) => {
        setSuccessMessage('Your Amount Withdraw Succesfully...!');
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
        <div id='m3'>
       <div className="n2 container mt-4">  
       <center><u><h2>Withdraw Account</h2></u></center>
      <div className="form-register">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label>Account Number :</label>
            <input
              type="number"
              {...register('accountnumber')}
              className={`form-control ${errors.accountnumber?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.accountnumber?.message}</span>
          </div>
          <div className="form-group">
            <label>Name :</label>
            <input
              type="text"
              {...register('fullname')}
              className={`form-control ${errors.fullname?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.fullname?.message}</span>
          </div>
          <div className="form-group">
            <label>Withdraw Amount :</label>
            <input
              type="number"
              {...register('debit')}
              className={`form-control ${errors.debit?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.debit?.message}</span>
          </div>

          <div className="form-group"><center>
            <button type="submit" className="btn btn-success mx-5">
              Withdraw
            </button>
            <button type="reset" className="btn btn-danger mx-5" onClick={() => reset()}>
              Reset
            </button></center>
            </div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </form>
      </div>
      </div>
      </div>
    </>
  );
};
