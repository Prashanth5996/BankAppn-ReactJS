import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./AdminForms.css";
import { useNavigate } from 'react-router-dom';
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  username:string;
  password: string;
  accounttype:string;
  address:string;
  gender:string;
  branch:string;
  mobilenumber:number;
  currentbalance:number;
  pinNumber:number;
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First name can't be left blank")
    .min(4, 'Minimum 4 characters are required')
    .max(10, 'Maximum 10 characters are allowed'),
  lastname: Yup.string()
    .required("Last name can't be left blank")
    .min(4, 'Minimum 4 characters are required')
    .max(10, 'Maximum 10 characters are allowed'),
  email: Yup.string().required("Can't leave email").email('Invalid email'),
  username: Yup.string().required("username can't be left blank"),
  password:Yup.string().required("Password can't be left blank")
    .min(6, 'Minimum 6 characters are required')
    .max(15, 'Maximum 15 characters are allowed'),
  accounttype:Yup.string().required("AccountType can't be left blank"),
  address: Yup.string()
    .required("Address Can't left blank")
    .min(6, 'Minimum should be 6 characters')
    .max(40, 'Maximum 40 characters are allowed'),
  gender:Yup.string().required("Gender can't be left blank"),
  branch:Yup.string().required("branch can't be left blank"),
  mobilenumber:Yup.string().required("Mobilenumber can't be left blank")
    .min(10, 'Minimum 10 Numbers are allowed') .max(10, 'Maximum 10 Numbers are allowed'),
  currentbalance:Yup.string().required("Currentbalance can't be left blank"),
  pinNumber:Yup.string().required("PinNumber can't be left blank").min(6, 'Minimum 6 characters are required').max(6, 'Maximum 6 Numbers are allowed')
});

export const AccountOpening = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [accountNumber, setAccountNumber] = useState<string | null>(null);
    const navigate = useNavigate();
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
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:7004/save', data);

      if (response.data === 'New Bank Account Created') {
        const idResponse = await axios.get(`http://localhost:7004/details/${data.email}`);

        if (idResponse.data) {
          const accountNumber = idResponse.data;
          console.log(`Account Number: ${accountNumber}`);
          setAccountNumber(accountNumber);
          setSuccessMessage('New Bank Account Created...!');
          setErrorMessage(null);
          navigate('/image', { state: { accountNumber :accountNumber} });
          return;
        }
      } else {
        setSuccessMessage(null);
        setErrorMessage('Account Creation Failed...!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <div id='m0'>
       <div className="container mt-4 "> 
       <u><h2 id="m1">Account Opening</h2></u><p></p>  
      <div className="form-register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>First Name :</label>
            <input
              type="text"
              {...register('firstname')}
              className={`form-control ${errors.firstname?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.firstname?.message}</span>
          </div>

          <div className="form-group">
            <label>Last Name :</label>
            <input
              type="text"
              {...register('lastname')}
              className={`form-control ${errors.lastname?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.lastname?.message}</span>
          </div>

          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              {...register('email')}
              className={`form-control ${errors.email?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.email?.message}</span>
          </div>

          <div className="form-group">
            <label>UserName :</label>
            <input
              type="text"
              {...register('username')}
              className={`form-control ${errors.username?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.username?.message}</span>
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              {...register('password')}
              className={`form-control ${errors.password?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span >{errors.password?.message}</span>
          </div>

          <div className="form-group">
            <label>AccountType :</label>
            <input
              type="text"
              {...register('accounttype')}
              className={`form-control ${errors.accounttype?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.accounttype?.message}</span>
          </div>

          <div className="form-group">
            <label>Address :</label>
            <textarea {...register('address')}
              className={`form-control ${errors.address?.message ? 'is-invalid' : ''}`} onClick={onClickInput}/> 
            <span>{errors.address?.message}</span>
          </div>

          <div className="form-group form-check-inline">
                <label>Gender :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <input
                  type="radio"
                  id="male"
                  value="male"
                  {...register("gender")}
                  className={`form-check-input ${errors.gender?.message ? 'is-invalid' : ''}`} onChange={onClickInput}
                />
                <label htmlFor="male">&nbsp;Male</label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  id="female"
                  value="female"
                  {...register("gender")}
                  className={`form-check-input ${errors.gender?.message ? 'is-invalid' : ''}`} onChange={onClickInput}
                />
                <label htmlFor="female">&nbsp;Female</label> &nbsp;&nbsp;&nbsp;&nbsp;
                <span>{errors.gender?.message}</span>
            </div>

          <div className="form-group">
            <label>Branch :</label>
            <select {...register("branch")}className={`form-control ${errors.branch?.message ? 'is-invalid' : ''}`} placeholder=" --Select Branch-- " onClick={onClickInput}>
                <option value="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ----Select Branch----</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option> 
            </select>
            <span>{errors.branch?.message}</span>
          </div>
          <div className="form-group">
            <label>MobileNumber :</label>
            <input
              type="number"
              {...register('mobilenumber')}
              className={`form-control ${errors.mobilenumber?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.mobilenumber?.message}</span>
          </div>

          <div className="form-group">
            <label>Current Balance :</label>
            <input
              type="number"
              {...register('currentbalance')}
              className={`form-control ${errors.currentbalance?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.currentbalance?.message}</span>
          </div>

          <div className="form-group">
            <label>New PinNumber :</label>
            <input
              type="text"
              {...register('pinNumber')}
              className={`form-control ${errors.pinNumber?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span>{errors.pinNumber?.message}</span>
          </div>

          <div className="form-group"><center>
            <button type="submit" className="btn btn-success mx-5 mb-4">
              Register
            </button>
            <button type="reset" className="btn btn-danger mx-2 mb-4" onClick={() => reset()}>
              Reset
            </button></center>
            <p></p>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
          </div>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};
