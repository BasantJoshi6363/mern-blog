import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [formdata,setFormdata] = useState({
        email : "",
        password : ""
    })

   async function formHandler(event){
    event.preventDefault();try {
        const response = await axios.post("http://localhost:5000/api/auth/v1/login",{email : formdata.email, password : formdata.password});
        console.log(response)
        localStorage.setItem("token",response.data.token);
        navigate("/")
    } catch (error) {
        console.log(error)
    }
   }
   function changeHandler(event){
    setFormdata(prevform =>{
        return {
            ...prevform,
            [event.target.name] : event.target.value
        }
    })

   }


    return (
        <div>
            <form onSubmit={formHandler}>
                <input name='email' onChange={changeHandler} value={formdata.email} type="text" /> <br />
                <input name='password' onChange={changeHandler} value={formdata.password} type="text" /> <br />
                <button>submit</button>
            </form>
        </div>
    )
}

export default Login