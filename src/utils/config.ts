export const config = {
	port: process.env.PORT,
	databaseURL: process.env.POSTGRES_URL as string,
	databaseTable: process.env.POSTGRES_TABLE as string,
	clientUrl: process.env.CLIENT_URL || (process.env.VERCEL_URL as string),
	assetsUrl: process.env.ASSETS_URL as string,
	email: {
		from: {
			name: process.env.EMAIL_FROM_NAME as string,
			address: process.env.EMAIL_FROM_ADDRESS as string,
		},
		subject: process.env.EMAIL_SUBJECT as string,
	},
	brevoApiKey: process.env.BREVO_API_KEY as string,
	cloudinary: {
		cloud_name: process.env.CLOUDINARY_NAME as string,
		api_key: process.env.CLOUDINARY_API_KEY as string,
		api_secret: process.env.CLOUDINARY_API_SECRET as string,
		folder_name: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME as string,
	},
	error: {
		invalidCloudinaryResource: process.env
			.INVALID_CLOUDINARY_RESOURCE as string,
	},
} as const;
