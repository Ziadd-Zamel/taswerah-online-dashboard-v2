import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { customAdmin } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            role: "admin",
          }),
          headers: {
            ...JSON_HEADER,
          },
        });
        console.log(response);
        const payload: APIResponse<customAdmin> = await response.json();
        // Throw an auth error if the login has failed
        if (!response.ok || !payload.success) {
          console.error("Login failed:", payload.message);
          return null;
        }
        const successPayload = payload as SuccessfulResponse<customAdmin>;
        console.log(successPayload);
        // Return the user object that matches the User interface
        return {
          id: successPayload.data.admin._id,
          admin: successPayload.data.admin,
          token: successPayload.data.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // If the user exists it was a successful login attempt, so save the new user data in the cookies
      if (user) {
        token.admin = user.admin;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      // Decode the user data from the token cookie and store it in the session object
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.user = token.admin;
      session.token = token.token;
      return session;
    },
  },
};
