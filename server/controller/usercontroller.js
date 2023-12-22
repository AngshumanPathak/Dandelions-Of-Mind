





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