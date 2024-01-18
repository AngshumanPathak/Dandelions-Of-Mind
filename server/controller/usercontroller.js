





import User from "../model/user-schema.js";

export const userSignup = async(request,response) => {

    const exist = await User.findOne({email: request.body.email});
     if(exist){
         return response.status(400).json({message: "User already exists"});
     }
    try{
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        console.log(request.body);

        response.status(200).json({message: user});
    }
    catch(error){

        response.status(500).json({message: error.message});

    }
}

export const userLogin = async(request,response) => {
    try{
          const email = request.body.email;
          const password = request.body.password;

          let user = await User.findOne({email: email, password: password});

          if (user) {
            return response.status(200).json({data: user , message: "Successfully logged in"});
          } else {
            return response.status(401).json({message: "Invalid credentials"});
          }
          }
    
    catch (error){
        response.status(500).json({message: error.message});
    }
}