import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation} from 'react-router-dom';
import "./UserForms.css";
type RecordData = {
  accountnumber: number;
  transaction_number: number;
  date: string;
  time: string;
  fullname: string;
  currentbalance: number;
  debit: number;
  credit: number;
  address: string;
};

type FormValues = {
  accountnumber: number;
  fromDate: string;
  toDate: string;
};

const Statements = () => {
  const { register, handleSubmit,watch } = useForm<FormValues>();
  const [transactions, setTransactions] = useState<RecordData[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showRadioTable, setShowRadioTable] = useState<boolean>(false);
  const location = useLocation();
  const accountnumber= location.state?.accountnumber;
  console.log(accountnumber);
  const {
    reset
  } = useForm<RecordData>({
  });
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  const onClickInput = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setTransactions([]);
    setShowTable(false);
  };

  const onSubmit = async (data: FormValues, option: string) => {
    try {
      let url = "";
      switch (option) {
        case "last7":
          url = `http://localhost:7004/getlast7/${accountnumber}`;
          break;
        case "last10":
          url =`http://localhost:7004/getlast10/${accountnumber}`;
          break;
        case "all":
          url = `http://localhost:7004/getallstatement/${accountnumber}`;
          break;
        case "last1Month":
          url = `http://localhost:7004/get1Monthtranstions/${accountnumber}`;
          break;
        case "last1Year":
          url = `http://localhost:7004/get1Yeartranstions/${accountnumber}`;
          break;
        default:
          throw new Error("Invalid option selected");
      }
      const response = await axios.get<RecordData[]>(url);
      if (response.data.length > 0) {
        setSuccessMessage("One Record Is Found..!");
        setTransactions(response.data);
        setShowTable(true);
      } else {
        setErrorMessage("Failed No Record Found..!");
      }
    } catch (error) {
      setErrorMessage("Failed No Record Found..!");
      console.error(error);
    }
  };
  const Submit = async (data: FormValues) => {
    try {
      const url = `http://localhost:7004/search/${accountnumber}?fromDate=${data.fromDate}&toDate=${data.toDate}`;
      const response = await axios.get<RecordData[]>(url);
      if (response.data.length > 0) {
        setSuccessMessage("One Record Is Found..!");
        setTransactions(response.data);
        setShowTable(true);
      } else {
        setErrorMessage("Failed No Record Found..!");
      }
    } catch (error) {
      setErrorMessage("Failed No Record Found..!");
      console.error(error);
    }
  };
  const fromDate = watch("fromDate");
  const toDate = watch("toDate");
  return (
    <form onSubmit={handleSubmit(Submit)} id="m9">
      <center>
        <br></br>
        <label>From Date :&nbsp;<input type="date" {...register("fromDate")}  onClick={onClickInput} /></label>&nbsp;&nbsp;&nbsp;&nbsp;
        <label>To Date :&nbsp;<input type="date" {...register("toDate")} onClick={onClickInput}/></label>
        <button type="submit" style={{backgroundColor:"#ff038e"}} className="btn text-white mx-3 fa fa-search"></button>
        <p></p>
        <label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" onClick={() => handleSubmit((data) => onSubmit(data, "last7"))()} value="last7" checked={selectedOption === "last7"} onChange={handleOptionChange}/>Get Last 7 Days Transactions
        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label>
        &nbsp;&nbsp;&nbsp;<input type="radio" onClick={() => handleSubmit((data) => onSubmit(data, "last10"))()} value="last10" checked={selectedOption === "last10"} onChange={handleOptionChange}/>Get Last 10 Days Transactions
        </label>
        <p></p>
        <label>
          <input type="radio" onClick={() => handleSubmit((data) => onSubmit(data, "last1Month"))()} value="last1Month" checked={selectedOption === "last1Month"} onChange={handleOptionChange}/>Get Last 1 Month Transactions
        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input type="radio" onClick={() => handleSubmit((data) => onSubmit(data, "last1Year"))()}  value="last1Year"checked={selectedOption === "last1Year"} onChange={handleOptionChange} />Get Last 1 Year Transactions
        </label>
        <p></p>
        <label>
          <input type="radio" onClick={() => handleSubmit((data) => onSubmit(data, "all"))()}  value="all" checked={selectedOption === "all"}onChange={handleOptionChange}/>Get All Transactions
        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="reset" style={{backgroundColor:"rgb(105, 34, 1)"}} className="btn text-white mx-3  mx-5" onClick={() => reset()}>
              Reset
        </button>
        <p></p>
      {showTable && (
          <table className="table table-warning table-striped table-hover table-bordered border-table-warning table-sm">
            <thead className="table table-dark text-center">
              <tr>
                <th>Account Number</th>
                <th>Transaction Number</th>
                <th>Date</th>
                <th>Full Name</th>
                <th>Current Balance</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Address</th>
                <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_number}>
                <td style={{textAlign:"center"}}>{transaction.accountnumber}</td>
                <td style={{textAlign:"center"}}>{transaction.transaction_number}</td>
                <td style={{textAlign:"center"}}>{transaction.date}</td>
                <td style={{textAlign:"center"}}>{transaction.fullname}</td>
                <td style={{textAlign:"center"}}>{transaction.currentbalance}</td>
                <td style={{textAlign:"center"}}>{transaction.debit}</td>
                <td style={{textAlign:"center"}}>{transaction.credit}</td>
                <td style={{textAlign:"center"}}>{transaction.address}</td>
                <td style={{textAlign:"center"}}>{transaction.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showRadioTable && (
          <table className="table table-warning table-striped table-hover table-bordered border-table-warning table-sm">
            <thead className="table table-drak text-center">
              <tr>
                <th>Account Number</th>
                <th>Transaction Number</th>
                <th>Date</th>
                <th>Full Name</th>
                <th>Current Balance</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Address</th>
                <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_number}>
                <td style={{textAlign:"center"}}>{transaction.accountnumber}</td>
                <td style={{textAlign:"center"}}>{transaction.transaction_number}</td>
                <td style={{textAlign:"center"}}>{transaction.date}</td>
                <td style={{textAlign:"center"}}>{transaction.fullname}</td>
                <td style={{textAlign:"center"}}>{transaction.currentbalance}</td>
                <td style={{textAlign:"center"}}>{transaction.debit}</td>
                <td style={{textAlign:"center"}}>{transaction.credit}</td>
                <td style={{textAlign:"center"}}>{transaction.address}</td>
                <td style={{textAlign:"center"}}>{transaction.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <p></p>
       {successMessage && <div className="alert alert-success">{successMessage}</div>}
       {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </center>
    </form>
  );
};

export default Statements;
