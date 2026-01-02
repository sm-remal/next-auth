"use server"
import bcrypt from 'bcryptjs';
import { dbConnect } from "@/lib/dbConnect";

export const postUser = async(payload) => {
    console.log(payload);

    // 1. Check user is Exist or not
    const isExist = await dbConnect("users").findOne({email: payload.email})
    if(isExist){
        return {
            success: false,
            message: "user already exist"
        }
    }


    const hashedPassword = await bcrypt.hash(payload.password, 10);
    // 2. Create new user 
    const newUser = {
        ...payload,
        createdAt: new Date().toISOString(),
        role: "user",
        password: hashedPassword
    }
    console.log(newUser)
    
    // 3. User Send to Database
    const result = await dbConnect("users").insertOne(newUser);
    if(result.acknowledged){
        return {
            success: true,
            message: `User created with ${result.insertedId.toString()}`,
        }
    }else{
        return {
            success: false,
            message: "Something went wrong. Try again"
        }
    }
}