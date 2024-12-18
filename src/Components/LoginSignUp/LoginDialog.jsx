import { Dialog, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { sendResetPasswordLink, authenticateSignup, authenticateLogin, resetUserPassword, getCart } from "../../service/api";
import { DataContext } from "../../Context/DataProvider";
 

// Design
import "./LoginSignUp.css";
import password_icon from "../assets/password.png";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import styled from "@emotion/styled";

const accountInitialValues = {
  login: { view: "Login" },
  signup: { view: "Signup" },
  forgotPasswordMail: { view: "Forgot Password" },
  resetPassword: { view: "Reset Password" },
};

const signupInitialValues = {
  username: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

const forgotPasswordMailInitialValues = {
  email: "",
};

const resetPasswordInitialValues = {
  newPassword: "",
  confirmPassword: "",
};

const Error = styled(Typography)`
  font-size: 14px;
  text-align: center;
  line-height: 0;
  font-weight: 600;
  margin-top: 10px;
`;

const LoginDialog = ({ open, setOpen }) => {
  const { token } = useParams();
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [forgotPasswordMail, setForgotPasswordMail] = useState(forgotPasswordMailInitialValues);
  const [resetPassword, setResetPassword] = useState(resetPasswordInitialValues);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAccount, setIsLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();

  

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
    setMessage("");
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const toggleForgotPassword = () => {
    toggleAccount(accountInitialValues.forgotPasswordMail);
  };

  const onInputChange = (e, stateUpdater) => {
    stateUpdater((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    if (!response) return;
    handleClose();
    setAccount(signup.username);
    setIsLoggedIn(true);
  };

  const loginUser = async () => {
    let response = await authenticateLogin(login);
    if (response?.status === 200) {
      const { data } = response.data;
      const { token, user, role } = data;
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", role);
        await getCart();

        setAccount(user.username);
        setIsLoggedIn(true);

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }

        handleClose();
      } else {
        console.error("Token is missing in the response");
      }
    } else {
      setError(true);
    }
  };

  const forgotPasswordHandler = async () => {
    setLoading(true);
    setError(false);
    setMessage("");

    if (!forgotPasswordMail.email) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await sendResetPasswordLink(forgotPasswordMail.email);
      if (response?.message) {
        setMessage(response.message);
      } else {
        setError("An error occurred while sending the reset link.");
      }
    } catch (err) {
      console.error("Error in forgotPasswordHandler:", err);
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };


  const resetPasswordHandler = async () => {
    
    setLoading(true);
    setError(false);

    if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await resetUserPassword(token, resetPassword.newPassword, resetPassword.confirmPassword);
      if (response?.message) {
        setMessage("Password reset successful. Please login with your new password.");
        setTimeout(() => {
          toggleAccount(accountInitialValues.login); // Switch to login view after success message
        }, 5000);
      } else {
        setError("An error occurred while resetting the password.");
      }
    } catch (err) {
      console.error("Error in resetPasswordHandler:", err);
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      toggleAccount(accountInitialValues.resetPassword);  // Show reset password view when token is present
    }
  }, [token]);


  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="container">
        <div className="header">
          <div className="text">{account.view}</div>
          <div className="underline"></div>
          <div className="inputs">
            {account.view === "Login" && (
              <>
                <div className="input">
                  <img src={email_icon} alt="" />
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    onChange={(e) => onInputChange(e, setLogin)}
                  />
                </div>
                <div className="input">
                  <img src={password_icon} alt="" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={(e) => onInputChange(e, setLogin)}
                  />
                </div>
                {error && <Error>Please Enter Valid Credentials</Error>}
                <div className="forgot-password">
                  Forgot Password? <a onClick={toggleForgotPassword}>Click Here</a>
                  <br />
                  New Here? <a onClick={toggleSignup}>Sign Up</a>
                </div>
                <button className="submit gray" onClick={loginUser}>
                  Login
                </button>
              </>
            )}

            {account.view === "Signup" && (
              <>
                <div className="input">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    placeholder="Type your username"
                    name="username"
                    onChange={(e) => onInputChange(e, setSignup)}
                  />
                </div>
                <div className="input">
                  <img src={email_icon} alt="" />
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    onChange={(e) => onInputChange(e, setSignup)}
                  />
                </div>
                <div className="input">
                  <img src={password_icon} alt="" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={(e) => onInputChange(e, setSignup)}
                  />
                </div>
                <button className="submit gray" onClick={signupUser}>
                  Sign Up
                </button>
              </>
            )}

            {account.view === "Forgot Password" && (
              <>
                <div className="input">
                  <img src={email_icon} alt="" />
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    onChange={(e) => onInputChange(e, setForgotPasswordMail)}
                  />
                </div>
                {loading && <Typography>Sending reset link...</Typography>}
                {error && <Error>{error}</Error>}
                {message && (
                  <Typography style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
                    {message}
                  </Typography>
                )}
                <button className="submit gray" onClick={forgotPasswordHandler}>
                  Reset Password
                </button>
              </>
            )}


{account.view === "Reset Password" && (
              <>
                <div className="input">
                  <img src={password_icon} alt="" />
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    name="newPassword"
                    onChange={(e) => onInputChange(e, setResetPassword)}
                  />
                </div>
                <div className="input">
                  <img src={password_icon} alt="" />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    onChange={(e) => onInputChange(e, setResetPassword)}
                  />
                </div>
                {error && <Error>{error}</Error>}
                <button className="submit gray" onClick={resetPasswordHandler}>
                  Reset Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginDialog;
