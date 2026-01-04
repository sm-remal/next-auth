import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

const userList = [
    { name: "asif", password: "1234" },
    { name: "ratul", password: "5678" },
    { name: "siam", password: "asdf" },
]

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Email & Password',
            credentials: {
                email: { label: "email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password", placeholder: "Enter password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;

                // const user = userList.find((u) => u.name == email);
                const user = await dbConnect("users").findOne({ email });
                if (!user) return null;

                const isPassword = await bcrypt.compare(password, user.password);

                if (isPassword) {
                    return user;
                }

                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        // async redirect({ url, baseUrl }) {
        //     return baseUrl
        // },

        async session({ session, token, user }) {
            if(token){
                session.role = token.role;
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user){
                token.email = user.email;
                token.role = user.role;
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }