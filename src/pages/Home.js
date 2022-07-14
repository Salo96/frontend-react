import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../index.css';
import axios from "axios";
import { toast } from 'react-toastify';

const Home = () => {
  const baseUrl= "http://localhost:5000/";
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async () =>{
    const resp = await axios.get(`${baseUrl}users`);
    if(resp.status === 200){
      setData(resp.data);
    }
  };

  const onDeleteUser = async(id) =>{
    if(window.confirm("are you sure that you wanted to delete that user record")){
      const resp = await axios.delete(`${baseUrl}user/${id}`);
      if(resp.status ===200){
        toast.success(resp.data);
        getUsers();
      }
    }
  }

  // console.log("data=>", data);

  return (
    <div>
      <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">contact</th>
              <th scope="col">action</th>
            </tr>
          </thead>
        <tbody>
          {data && data.map((item, i) => {
            return(
              <tr key={i}>
                <th scope="row">{ i + 1 }</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button type="button" className="btn btn-outline-primary mr-1">Edit</button>
                  </Link>

                  <button type="button" className="btn btn-outline-danger" onClick={() => onDeleteUser(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })};
        </tbody>
      </table>
    </div>
  );
};

export default Home;