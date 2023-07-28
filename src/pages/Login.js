import { useRef, useState, useContext, useEffect, } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../index.css";
import { useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const { setAuth, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    //this means the location you want to go after login or '/' first route
    const from = location?.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const resp = await axios.post('http://localhost:5000/api/users/login',
          JSON.stringify({
            "email": user,
            "password": pwd
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true
          }
        )

        const accessToken = resp.data.accessToken;
        const role = resp.data.role;
        console.log(resp.data);
        setAuth({user: resp.data.user, role, accessToken});

        setPwd('')
        setUser('')
        navigate(from, { replace: true});
      } catch (error) {
        if(!error?.response) {
          setErrMsg('no server response');
        }
        else if(error?.response?.status === 400){
          setErrMsg('missing email or password');
        }
        else if(error?.response?.status === 401){
          setErrMsg('unauthorized');
        }
        else{
          setErrMsg('login failed');
        }
        errRef.current.focus();
      }

    }

  return (
      <section>
      <p ref={errRef} className={errMsg ? 'errmsg' : "offScreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          ref={userRef}
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </section>
  )
}

export default Login;
