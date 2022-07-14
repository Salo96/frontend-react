import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialstate = {
  name: '',
  email: '',
  contact: '',
}

const AddEdit = () => {

  const baseUrl= "http://localhost:5000/";

  const [state, setState] = useState(initialstate);
  const { name, email, contact } = state

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id){
      getIdUser(id)
    }
  }, [id])

  const getIdUser = async (id) => {
    const resp = await axios.get(`${baseUrl}user/${id}`);
    if(resp.status ===200){
      setState({ ...resp.data[0]})
    }
  }

  const addUser = async ( data) =>{
    const resp = await axios.post(`${baseUrl}user`, data);
    if(resp.status === 200){
      toast.success(resp.data)
    }
  }

  const updateUser = async ( data, id ) =>{
    const resp = await axios.put(`${baseUrl}user/${id}`, data);
    if(resp.status === 200){
      toast.success(resp.data)
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name || !email || !contact){
      toast.error("por favor introdusca un valor");
    }else{
      if(!id){
        addUser(state);
      }else{
        updateUser(state, id)
      }
     
      navigate("/");
    }
  }

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({ ...state, [name]: value });
  }

  return (
    <div className='container'>
        <form  onSubmit={handleSubmit}>
         

          <div className="form-group row mt-2">
            <label for="name" className="col-md-4 col-form-label text-md-right">name</label>
            <div className="col-md-6">
                <input 
                  id="name" 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  onChange={handleInputChange}
                  value={name}
                /> 
            </div>
          </div>

          <div className="form-group row mt-2">
            <label for="email" className="col-md-4 col-form-label text-md-right">email</label>
            <div className="col-md-6">
                <input 
                  id="email" 
                  type="text" 
                  className="form-control" 
                  name="email" 
                  onChange={handleInputChange}
                  value={email}
                /> 
            </div>
          </div>

          <div className="form-group row mt-2">
            <label for="contact" className="col-md-4 col-form-label text-md-right">contact</label>
            <div className="col-md-6">
                <input 
                  id="contact" 
                  type="text" 
                  className="form-control" 
                  name="contact" 
                  onChange={handleInputChange}
                  value={contact}
                /> 
            </div>
          </div>

        <input type="submit" value={ id ? "update" : "Add" } className='btn btn-outline-success' />
        </form>
    </div>
  )
}

export default AddEdit