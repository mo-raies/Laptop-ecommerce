import { NextResponse } from "next/server";
import  User from "../models/User.js" ;
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers.js";

export const register = async(req,res) => {
  try {
    const body = await req.json()
    const {fullname, username, mobilenumber, password, gender} = body;
    console.log('ghgshdgS',fullname, username, mobilenumber, password, gender)

    if(!fullname || !username || !mobilenumber || !password || !gender){
      return NextResponse.json({message: 'All fields are required', status: 400})

    }
    
    const user = await User.findOne({username})
    if(user){
     return NextResponse.json({message: 'Username already exit try different', status: 400})
    }

    const hashedPassword = await bcrypt.hash(password,10)

      // profilePhoto
      const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      await User.create({
        fullname,
        username,
        mobilenumber,
        profilePhoto: gender ==='male' ? maleProfilePhoto : femaleProfilePhoto,password:hashedPassword,
        gender
      })
    
      return NextResponse.json(
        { message: "Account successfully created", success: true },
        { status: 201 }
      );

    
  } catch (error) {
    console.log("error:", "something went wrong")
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export const login = async (req, res) => {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Validate input fields
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find user by username
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password", success: false },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid username or password", success: false },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {user},
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Prepare user data to send (excluding password)
    const userData = user;

    // Set token in HTTP-only cookie (optional, for added security)
    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        user: userData,
        token,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed", success: false, error: error.message },
      { status: 500 }
    );
  }
};

export const logout = async (req,res) => {
  try {
    const response= NextResponse.json({message: "logout sucessfully",success:true },{status:200})
    response.cookies.set({
      name: 'token', // Replace with your cookie name
      value: '',
      expires: new Date(0),
      httpOnly: true,
    });
    return response
  } catch (error) {
    console.log("error: ",error)
  }
}