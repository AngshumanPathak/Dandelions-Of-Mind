
import {Dialog} from "@mui/material";

import { useState, useContext } from "react";

import { authenticateSignup } from "../../service/api";
import { DataContext } from "../../Context/DataProvider";
//design
import './LoginSignUp.css'
import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';


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



const LoginDialog = ({open, setOpen}) => {

    const [account,toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const {setAccount} = useContext(DataContext);
    const handleClose = () => {
        toggleAccount(accountInitialValues.login);
        setOpen(false);
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
                    <input type="email" placeholder='Enter your Email'  name='email' onChange={(e) => onInputChange(e)}/>
                </div>
                <div className = 'input' >
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder ="Enter password"  name='password' onChange={(e) => onInputChange(e)}/>
                </div>
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
            <button className="submit" >Login</button>
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