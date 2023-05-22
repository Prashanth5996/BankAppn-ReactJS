import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./UserLogin.css";
type FormValues = {
  username: string;
  password: string;
};
const validationSchema = Yup.object().shape({
  username: Yup.string().required("username can't be left blank"),
  password:Yup.string().required("Password can't be left blank")
    .min(6, 'Minimum 6 characters are required')
    .max(15, 'Maximum 15 characters are allowed')
});
const UserLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(validationSchema)});
  const navigate = useNavigate();
  const [accountnumber, setAccountNumber] = useState<string | null>(null); // Initialize userId to null
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onClickInput = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post('http://localhost:7004/userlogin', data);
      if (response.data === 'LOGIN SUCCESS...!') {
        const idResponse = await axios.get(`http://localhost:7004/user/${data.username}`);
        console.log('UserLogin...!');
        console.log(idResponse.data); 
        const accountnumber = idResponse.data;
        navigate(`/userdashboard`,{ state: { accountnumber: accountnumber } }); // Pass userId as state to the Dashboard component
        if (idResponse.data) {
          const accountnumber = idResponse.data; 
          console.log(`AccountNumber: ${accountnumber}`);
          setAccountNumber(accountnumber);
          return;
        }
        
      } else {
        navigate('/error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body className='login-body'>
      <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form user">
     <div className='fa fa-user-circle-o' id='k1'></div>
         <div className="form-group">
            <label className="fa fa-user">&nbsp;&nbsp;UserName </label>
            <input
              type="text" placeholder="Email or Phone"
              {...register('username')}
              className={`form-control ${errors.username?.message ? 'is-invalid' : ''} `} onClick={onClickInput}
            />
            <span>{errors.username?.message}</span>
          </div>
          <div className="form-group">
            <label className="fa fa-key">&nbsp;&nbsp;Password </label>
            <input
              type="password" placeholder="Password"
              {...register('password')} 
              className={`form-control ${errors.password?.message ? 'is-invalid' : ''}`} onClick={onClickInput}
            />
            <span >{errors.password?.message}</span>    
          </div> 
            <p></p>
        <center><button className='login-button' type="submit">Submit</button></center>
        {accountnumber && <p>Account Number: {accountnumber}</p>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </form>
      </div>
    </body>
  );
};

export default UserLogin;