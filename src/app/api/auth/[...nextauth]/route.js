import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const userList = [
    {name: "asif", password: "1234"},
    {name: "ratul", password: "5678"},
    {name: "siam", password: "asdf"},
]

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Email & Password',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter username" },
                password: { label: "Password", type: "password", placeholder: "Enter password"},
                secretCode: { label: "Secret Code", type: "number", placeholder: "Enter secret Code"}
            },
            async authorize(credentials, req) {
                const {username, password, secretCode} = credentials;

                const user = userList.find((u) => u.name == username);
                if(!user) return null;

                const isPassword = user.password == password;
                if(isPassword){
                    return user;
                }

                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }