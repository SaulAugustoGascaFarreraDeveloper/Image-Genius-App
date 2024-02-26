"use server"

import User from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"


//CREATE
export const createUser = async (user: CreateUserParams) => {

    try{
        await connectToDatabase()

        const newUser = await User.create(user)

        if(!newUser) throw new Error("Create User Fail")

        return JSON.parse(JSON.stringify(newUser))

    }catch(error)
    {   
        handleError(error)
    }

}


//GET 

export const getUserById = async (userId: string) => {

    try{

        await connectToDatabase()

        const user = await User.findOne({clerkId: userId})

        if(!user) throw new Error("User not Found")


        return JSON.parse(JSON.stringify(user))

    }catch(error)
    {
        handleError(error)
    }

        
}


//Update

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    
    try{

        await connectToDatabase()


        const updateUser = await User.findOneAndUpdate({clerkId},user,{
            new: true
        })

        if(!updateUser) throw new Error("Update User Fail")

        return JSON.parse(JSON.stringify(updateUser))

    }catch(error)
    {
        handleError(error)
    }

}


//Delete

export const deleteUser = async (clerkId: string) => {

    try{

        await connectToDatabase()

        //find user to delete
        const userToDelete = await User.findOne({clerkId})

        if(!userToDelete) throw new Error("User Not Found")

        const deletedUser = await User.findByIdAndDelete(userToDelete._id)

        revalidatePath("/")

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null

    }catch(error)
    {
        handleError(error)
    }

}

//Use Credits

export const updateCredits = async (userId: string,creditFee: number) => {

    try{

        await connectToDatabase()

        const updateUserCredits = await User.findByIdAndUpdate({_id: userId},{$inc: {creditBalance: creditFee}},{new: true})

        if(!updateUserCredits) throw new Error("User credits update 😽 ")


        return JSON.parse(JSON.stringify(updateUserCredits))

    }catch(error)
    {
        handleError(error)
    }

}