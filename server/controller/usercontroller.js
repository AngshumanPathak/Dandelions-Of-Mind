



import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';

import {google} from 'googleapis'
import base64url from 'base64url';


import User from "../model/user-schema.js";
import dotenv from 'dotenv'

export const userSignup = async(request,response) => {

    const { email, password, username } = request.body;

    const exist = await User.findOne({email: request.body.email});
     if(exist){
         return response.status(400).json({message: "User already exists"});
     }
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = {
            username: username,
            email: email,
            password: hashedPassword,  
        };


        if (user.email === 'borgohainparis@gmail.com') {
            user.role = 'admin';  
        } else {
            user.role = 'user';  
        }
        const newUser = new User(user);
        await newUser.save();
        console.log(user);

        response.status(200).json({message: "User created successfully", user: newUser});
    }
    catch(error){

        response.status(500).json({message: error.message});

    }
}

export const userLogin = async(request,response) => {
    
    dotenv.config()

    const { email, password } = request.body;
    try{
          let user = await User.findOne({email: email});



          if (!user){

            return response.status(401).json({ message: "Invalid credentials" });



            
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
            const role = user.role
            const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return response.status(200).json({data: {user,token, role}  , message: "Successfully logged in"});
          } else {
            return response.status(401).json({message: "Invalid credentials"});
          }
          }
    
    catch (error){
        response.status(500).json({message: error.message});
    }
}



export const forgotPasswordMail = async (req, res) => {
    dotenv.config(); // Load environment variables
    const { email } = req.body; // Get email from request body

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate reset token and set expiry
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Configure OAuth2 client
      const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        process.env.GMAIL_REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

      // Generate access token
      const { token } = await oAuth2Client.getAccessToken();
      console.log('Access Token:', token); // Destructure to directly get the token
      const baseUrl = process.env.CLIENT_URL.replace(/\/$/, '');

      const resetUrl = `${baseUrl}/reset-password/${resetToken}`;

      // Create the email in RFC 2822 format
      const emailMessage = createEmail(
        email,
        process.env.EMAIL, // Your Gmail address
        'Password Reset Request for Dandelions of Mind',
        `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`
      );
  
      // Base64 encode the email
      const encodedEmail = base64url.encode(emailMessage);
  
      // Send email via Gmail API
      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedEmail,
        },
      });
  
      res.status(200).json({ message: 'Password Reset Link sent to email' });
  
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Function to create an email in RFC 2822 format
  function createEmail(toEmail, fromEmail, subject, body) {
    return `To: ${toEmail}\r\n` +
           `From: ${fromEmail}\r\n` +
           `Subject: ${subject}\r\n\r\n` +
           `${body}`;
  }

export const resetPassword = async(req, res)=>{


    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    try {
        
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, 
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpires = undefined; 
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}




