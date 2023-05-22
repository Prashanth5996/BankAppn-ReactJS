import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./AdminForms.css";
import { useLocation , useNavigate} from 'react-router-dom';

interface FormData {
  image: FileList;
  file: FileList;
}

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required('Photo can\'t be left blank'),
  file: Yup.mixed().required('Adharcard can\'t be left blank')
});

export const Image = () => {
  const location = useLocation();
  const accountNumber=location.state?.accountNumber;
  console.log(`Account Number: ${accountNumber}`);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('file', data.file[0]);
    axios
      .patch(`http://localhost:7004/image/${accountNumber}`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then((response) => {
        // setSuccessMessage('New image and file inserted successfully!');
        setSuccessMessage('New Bank Account Created Successfully...!');
        setErrorMessage(null);
        console.log(response);
      })
      .catch((error) => {
        setSuccessMessage(null);
        setErrorMessage('Account Creation Failed...!');
        console.log(error);
      });
  };
  const navigateToAccountOpening = () => {
    navigate('/admindashboard');
  };
  return (
    <>
      <div id='n0'>
        <div className="img1 container">
          <div className="form-register">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group"> 
                <label className='fa fa-cloud-upload'>&nbsp;&nbsp;Photo</label>
                <input
                  type="file"
                  {...register('image')}
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`} onClick={onClickInput}
                />
                <span>{errors.image?.message}</span>
              </div>

              <div className="form-group">
                <label className='fa fa-cloud-upload'>&nbsp;&nbsp;Adharcard</label>
                <input
                  type="file"
                  {...register('file')}
                  className={`form-control ${errors.file ? 'is-invalid' : ''}`} onClick={onClickInput}
                />
                <span>{errors.file?.message}</span>
              </div>
              <div className="form-group"><center>
                <button type="submit" className="btn btn-success mx-5 mb-5">
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-danger mx-5 mb-5"
                  onClick={() => reset()}
                >
                  Reset
                </button>
                <button className="btn btn-primary mx-5 mb-5" onClick={navigateToAccountOpening}>Back</button></center>
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
