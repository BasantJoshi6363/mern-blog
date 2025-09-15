import axios from "axios";
import { createContext, useCallback, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom"
export const AuthContext = createContext();
import { toast } from "react-hot-toast";

const baseUrl = "http://localhost:5000"
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState("");
    const validateToken = useCallback(async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/api/validate-token`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data) {
                setUser({
                    username: response.data.username,
                    email: response.data.email,
                    userId: response.data.userId
                });
                setIsAuthenticated(true);
            }
            setLoading(false);


        } catch (error) {
            // toast.error("Token validation failed");
            localStorage.removeItem("token");
        }

    }, [])

    useEffect(() => {
        validateToken();
        checkIsAuthor();
    }, [validateToken]);

    const login = useCallback(async (data) => {
        setLoading(true);

        try {
            const res = await axios.post(`${baseUrl}/api/login`, {
                email: data.email,
                password: data.password
            });
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
            setUser(res.data.user);
            window.location.reload();
            navigate("/p")

        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            setLoading(false)
        }
        setLoading(false);
    }, [])
    const register = useCallback(async (data) => {
        setLoading(true)
        try {
            const response = await axios.post(`${baseUrl}/api/register`, {
                username: data.username,
                email: data.email,
                password: data.password
            })
            navigate("/login")
            toast.success(response.data.message);

        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }, [])
    const logout = useCallback(async () => {

        try {
            setLoading(true);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
            toast.success("logout successful");
            navigate("/login");

        } catch (error) {
            setLoading(false);
            toast.error("logout failed");
        }
        setLoading(false);
    }, [])

    const checkIsAuthor = useCallback(async () => {
        try {
           const response =  await axios.get("http://localhost:5000/api/v1/user/me", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            console.log(response.data);
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }, [])



    return <AuthContext.Provider value={{
        login,
        register,
        logout,
        loading,
        user,
        isAuthenticated,
        setLoading
    }} >
        {children}
    </AuthContext.Provider>

}

export default memo(AuthProvider);