import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	secret: process.env.NEXTAUTH_SECRET as string,
	providers: [
		GoogleProvider({
			clientId: process.env.OAUTH_CLIENT_KEY as string,
			clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === "google") {
				return (
					(profile?.email_verified ?? false) &&
					(profile?.email?.endsWith("@gmail.com") ?? false)
				);
			}
			return true;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
});
