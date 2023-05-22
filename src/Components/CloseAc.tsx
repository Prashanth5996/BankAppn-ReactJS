import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./AdminForms.css";
interface FormData {
  accountnumber:number;
  fullname:string;
}

const validationSchema = Yup.object().shape({
  accountnumber:Yup.number().required("Account Number cant left Blank"),
  fullname: Yup.string()
    .required("First name can't be left blank")
    .min(4, 'Minimum 4 characters are required')
    .max(20, 'Maximum 20 characters are allowed')
});

export const CloseAc = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      .post('http://localhost:7004/closeac', data)
      .then((posRes) => {
        setSuccessMessage('Your Closed Permanently..!');
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
        <div id='m5'>
        <center><u><h2>Close Account</h2></u></center> 
       <div className="n3 container mt-4">  
      <div className="form-register">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              {...register('accountnumber')}
              className={`form-control ${errors.accountnumber?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.accountnumber?.message}</span>
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
          <div className="form-group"><center>
            <button type="submit" className="btn btn-success mx-3">
              Register
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
