export const config = {
	port: process.env.PORT,
	databaseURL: process.env.DATABASE_URL as string,
	clientUrl: process.env.CLIENT_URL || (process.env.VERCEL_URL as string),
	assetsUrl: process.env.ASSETS_URL as string,
	email: {
		from: process.env.EMAIL_FROM as string,
		subject: process.env.EMAIL_SUBJECT as string,
	},
	brevoApiKey: process.env.BREVO_API_KEY as string,
	cloudinary: {
		cloud_name: process.env.CLOUDINARY_NAME as string,
		api_key: process.env.CLOUDINARY_API_KEY as string,
		api_secret: process.env.CLOUDINARY_API_SECRET as string,
	},
} as const;
