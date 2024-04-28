import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials, req) {                
                try {
                    // Add logic here to look up the user from the credentials supplied
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        identifier: credentials?.email,
                        password: credentials?.password,
                        }),
                    });
                    const user = await res.json();
                    console.log('user', user);

                    if (user) {
                        return user;
                    } else {
                        return null;
                    }

                } catch (error) {
                    const errorMessage = error.message;
                    throw new Error(errorMessage);
                }
                
            },
        }),
    ],
    // database: process.env.NEXT_PUBLIC_DATABASE_URL,
    //   session: {
    //     jwt: true,
    //   },
    callbacks: {
        jwt: async (token, user) => {
            if (user){
            token.jwt = user.jwt;
            token.username = user.username;
            }
            return Promise.resolve(token);
        },
        session: async (session, token) => {
            session.jwt = token.jwt;
            session.username = token.username;
            return Promise.resolve(session);
        },
    },

    pages: {
        signIn: "/member/login",
    },

});

export { handler as GET, handler as POST };