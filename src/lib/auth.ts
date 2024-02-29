import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	secret: process.env.NEXTAUTH_SECRET as string,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const user = {
					id: '1',
					name: process.env.DUMMY_USER,
					email: process.env.DUMMY_EMAIL,
				};

				if (user) return user;

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
	pages: {
		signIn: '/sign-in',
	},
});

/**
 *
 *  Disabled the below code for Google Auth, above code is for demo purpose
 */

// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export const {
// 	handlers: { GET, POST },
// 	auth,
// } = NextAuth({
// 	secret: process.env.NEXTAUTH_SECRET as string,
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.OAUTH_CLIENT_KEY as string,
// 			clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
// 			authorization: {
// 				params: {
// 					prompt: 'consent',
// 					access_type: 'offline',
// 					response_type: 'code',
// 				},
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		async signIn({ account, profile }) {
// 			if (account?.provider === 'google') {
// 				return (
// 					(profile?.email_verified ?? false) &&
// 					(profile?.email?.endsWith('@gmail.com') ?? false)
// 				);
// 			}
// 			return true;
// 		},
// 	},
// 	pages: {
// 		signIn: '/sign-in',
// 	},
// });
