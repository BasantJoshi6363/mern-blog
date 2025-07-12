import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/v1/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={changeHandler}
        />
        <br />
        <input
          name="email"
          type="text"
          value={formData.email}
          onChange={changeHandler}
        />
        <br />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={changeHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;