import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Details {
  accountnumber: number;
  firstname: string;
  lastname: string;
  fullname:string;
  email: string;
  username:string;
  password: string;
  accounttype:string;
  address:string;
  gender:string;
  branch:string;
  mobilenumber:number;
  pinNumber:number;
  status:string;
  userData: UserData;
}

interface UserData {
  name: string;
  image: string;
  file: string;
}

const GetAllDetailsUserData: React.FC = () => {
  const [data, setData] = useState<Details[]>([]);

  useEffect(() => {
    axios.get('http://localhost:7004/getAllDUD')
      .then(res => {
        const detailsData = res.data;
        const mappedData = detailsData.map((details: any) => ({
          accountnumber: details[0].accountnumber,
          firstname: details[0].firstname,
          lastname: details[0].lastname,
          fullname: details[0].fullname,
          email: details[0].email,
          username: details[0].username,
          password: details [0].password,
          accounttype: details[0].accounttype,
          address: details[0].address,
          gender: details[0].gender,
          branch: details[0].branch,
          mobilenumber: details[0].mobilenumber,
          pinNumber: details[0].pinNumber,
          status:details[0].status,
          userData: {
            name: details[1].name,
            image: details[1].image,
            file: details[1].file
          }
        }));
        setData(mappedData);
      })
      .catch(error => console.log(error));
  }, []);

  const displayFile = (file: string) => {
    const win = window.open();
    win?.document.write(`<iframe src="${file}" style="width:100%; height:100%;"></iframe>`);
  }

  return (
    <>
      <table className='table table-dark table-striped table-hover table-bordered border-table-warning table-sm'>
        <thead className='table table-danger text-center'>
          <tr>
            <th>AccountNumber</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>FullName</th>
            <th>Email</th>
            <th>UserName</th>
            <th>Password</th>
            <th>AccountType</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Branch</th>
            <th>MobileNumber</th>
            <th>Status</th>
            <th>Name</th>
            <th>Photo</th>
            <th>AdharCard</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => {
            return (
              <tr key={element.accountnumber}>
                <td className='align-middle' style={{textAlign:"center"}}>{element.accountnumber}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.firstname}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.lastname}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.fullname}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.email}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.username}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.password}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.accounttype}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.address}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.gender}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.branch}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.mobilenumber}</td>
                <td className='align-middle' style={{color:'green',textAlign:"center"}}>{element.status}</td>
                <td className='align-middle' style={{textAlign:"center"}}>{element.userData.name}</td>
                <td className='align-middle'><img src={`data:image/png;base64,${element.userData.image}`} alt={element.userData.name} style={{ height: '70px', width: '80px', border: '1px solid black' }} /></td>
                <td className='align-middle'><button className='btn btn-warning' onClick={() => displayFile(`data:application/pdf;base64,${element.userData.file}`)} style={{ height: '30px', width: '120px', border: '1px solid black', padding: '1px' }}>Show File </button></td>
                <td className='align-middle'><button className='fas fa-edit' style={{backgroundColor:"skyblue"}}></button></td>
                <td className='align-middle'><button className='fas fa-trash-alt'style={{backgroundColor:"red",marginLeft:"5px"}}></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default GetAllDetailsUserData;