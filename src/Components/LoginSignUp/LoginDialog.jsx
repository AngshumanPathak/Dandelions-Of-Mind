
import {Dialog, Typography} from "@mui/material";

import { useState, useContext } from "react";

import { authenticateSignup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../Context/DataProvider";
//design
import './LoginSignUp.css'
import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import styled from "@emotion/styled";


const accountInitialValues = {
    login : {
        view : 'Login',
        
    },
    signup: {
        view : 'Signup'
    }
}


const signupInitialValues = {
    username: '',
    email : '',
    password: ''
}

const loginInitialvalues = {
    email: '',
    password: ''
}

const Error = styled(Typography)`
font-size: 14px;
text-align: center;
line-height: 0;
font-weight: 600;
margin-top: 10px;

`


  


const LoginDialog = ({open, setOpen}) => {

    const [account,toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const {setAccount} = useContext(DataContext);
    const [login, setLogin] = useState(loginInitialvalues);
    const [error, setError] = useState(false);
    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
        
        
    }
    

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
        
    }

    const onInputChange = (e) =>{
        setSignup({...signup,[e.target.name]:e.target.value});
        
    }
    

    const signupUser = async() => 
      {
         let response = await authenticateSignup(signup);
         if(!response) return;
         handleClose();
         setAccount(signup.username);
      }

    const onValueChange = (e) =>{
        setLogin({...login,[e.target.name]:e.target.value});
    }
    
    const loginUser = async() =>{
        let response = await authenticateLogin(login);
        console.log(response);
        if(response.status === 200) {
            handleClose();
            setAccount(response.data.data.username);
        }
        else{
           setError(true);
        }
        
    }

     return (
         <Dialog open = {open} onClose={handleClose}>
             <div className = 'container'>
        
         
        
        <div className = 'header'>
            <div className = 'text'>{account.view}</div>
            <div className = 'underline'></div>
            <div className = 'inputs'>
                {account.view === 'Login'?<div></div>:<div className = 'input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Type your username'  name='username'  onChange={(e) => onInputChange(e)}/>
                </div>}
                
                <div className = 'input' >
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Enter your Email'  name='email' onChange={(e) => {onInputChange(e); onValueChange(e)}}/>
                    
                    
                </div>
                <div className = 'input' >
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder ="Enter password"  name='password' onChange={(e) => {onInputChange(e); onValueChange(e)}}/>

                      
                </div>
                {error && <Error>Please Enter Valid Credentials</Error>}
                
                {account.view === 'Login'?<div className="forgot-password">Forgot Password?<span href=""><a>Click Here</a></span><br/>
                <span>New Here <a onClick={() => toggleSignup()}>Sign Up</a></span></div> : <div></div> }
                
                
                
                <div className="submit-container">
    {account.view === "Signup" && (
        <div className="sign-up">
            <button className="submit gray" onClick={() => signupUser() }>Sign Up</button>
        </div>
    )}

    {account.view === "Login" && (
        <div className="login">
            <button className="submit" onClick={() => loginUser()}>Login</button>
        </div>
    )}
</div>
            </div>
        </div>
      
    </div>
         </Dialog>
     )
}

export default LoginDialog;