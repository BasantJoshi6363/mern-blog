import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const navigate = useNavigate();
    const [isAuth,setIsAuth] = useState(null);
    const isValidate= useCallback(async ()=>{
         try {
            const response = await axios.post("http://localhost:5000/validatetoken",{token : localStorage.getItem("token")});
            setIsAuth(response.data.success)
        } catch (error) {
            console.log(error)
            setIsAuth(false)
        }
    },[1])
   const logout = useCallback(()=>{
    localStorage.removeItem("token");
    navigate("/login")
   },[navigate])
 
    useEffect(()=>{
        isValidate();
    },[])
    return (
        <AuthContext.Provider value={{isAuth,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

