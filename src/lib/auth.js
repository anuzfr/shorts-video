import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
           name:"Credentials",
           credentials: {
            email: {label:"Email" , type: "text"},
            password: {label:"Password" , type: "password"}
           },

           async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
                throw new Error("missing email or password")
            }

            try {
                await connectToDatabase()
                const user = await User.findOne({email:credentials.email})

                if(!user){
                    throw new Error("no user found with this email")
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if(!isValid){
                    throw new Error("invalid password")
                }

                return{
                    id: user._id.toString(),
                    email: user.email
                }
            } catch (error) {
                console.error('auth error', error)
                throw error
            }
        }}
    ),
],
callbacks:{
    async jwt({token,user}){
        if(user){
            token.id = user.id
        }
        return token
    },

    async session({session , token}){
        if(session.user){
            session.user.id = token.id 
        }
        return session;
    }


},

pages: {
    signIn: "/login",
    error: "/login"
},
session:{
    strategy:"jwt",
    maxAge: 30 * 24 * 60 * 60,
},

};