import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './AdminLogin.css';

type FormValues = {
  username: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username can't be left blank"),
  password: Yup.string()
    .required("Password can't be left blank")
    .min(6, 'Minimum 6 characters are required')
    .max(15, 'Maximum 15 characters are allowed'),
});

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onClickInput = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const onSubmit = (data: FormValues) => {
    if (data.username === 'admin' && data.password === 'admin1234') {
      console.log('Successful login');
      navigate('/admindashboard');
    } else {
      navigate('/error');
      console.log('Invalid credentials');
    }
  };

  return (
    <body>
        <div>
        <h4>
            <img src="https://assets.bizclikmedia.net/668/ef0ad4e3aed37c588bc870b8b9cc5541:cf562b90fa4f6d0d1717b2a0f2d70b84/large-46d85f80-ea34-1be5-51cd-78eb83fa26a0-jpeg.webp"
            alt="Bank building" className='building-img'></img></h4>
      </div>
    <div className="admin">
      <div className="admin-login">
        <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
          <div className="form-group">
            <center>
              <p>
                Administrator&nbsp;
                <li className="fas fa-shield-alt"></li>
              </p>
            </center>
          </div>
          <div>
            <p className="fa fa-user-circle">&nbsp;&nbsp;UserName </p>
            <input
              type="text"
              placeholder="Email or Phone"
              {...register('username')}
              className={`form-control admin-login ${errors.username?.message ? 'is-invalid' : ''} `}
              onClick={onClickInput}
            />
            <span>{errors.username?.message}</span>
          </div>
          <div>
            <p className="fa fa-key">&nbsp;&nbsp;Password </p>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className={`form-control admin-login ${errors.password?.message ? 'is-invalid' : ''}`}
              onClick={onClickInput}
            />
            <span>{errors.password?.message}</span>
          </div>
          <p></p>
          <center>
            <button className="admin-button" type="submit">
              Submit
            </button>
          </center>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </form>
      </div>
    </div>
    </body>
  );
};

export default AdminLogin;
