import {
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

import { config } from '@/utils/config';

export function EmailTemplate() {
	const baseUrl = config.assetsUrl;

	return (
		<Html>
			<Head />
			<Preview>CornerMail</Preview>
			<Section style={main}>
				<Container style={container}>
					<Section>
						<Section style={headerBlue}>
							<Img
								src={`${baseUrl}/header.png`}
								width="305"
								height="28"
								alt="CICCC header blue transparent"
							/>
						</Section>
						<Section style={sectionLogo}>
							<Img
								src={`${baseUrl}/logo.png`}
								width="320"
								height="75"
								alt="CICCC logo"
							/>
						</Section>
					</Section>
					<Section style={paragraphContent}>
						<Hr style={hr} />
						<Text style={heading}>Certificate</Text>
						<Text style={paragraph}>
							Do Not Reply. This is an automated email using a third-party
							secure portal.
						</Text>
						<Text style={paragraph}>Dear User</Text>
						<Text style={paragraph}>
							Please find attached your confidential tax form.
						</Text>
						<Text style={paragraph}>
							Your tax form contains sensitive personal information, including
							your social insurance number. Download it using a trusted, secure
							connection instead of over free, public wi-fi, such as at airports
							or coffee shops, etc.
						</Text>
						<Text style={paragraph}>
							Should you require assistance with your tax filing, we recommend
							reaching out to our preferred partner, Corner Accounting Services.
							They are currently offering a special, limited-time discount
							exclusively for Cornerstone students, designed to help you save on
							tax services. For more details and to take advantage of this
							offer, please visit:{' '}
							<a href="https://www.andasan.com">
								https://https://www.andasan.com
							</a>
						</Text>
					</Section>

					<Section style={paragraphContent}>
						<Text style={paragraph}>Thank you</Text>
					</Section>
					<Section style={containerContact}>
						<Section
							style={{
								padding: '20px 20px',
							}}
						>
							<Text style={paragraph}>Connect with us</Text>
							<table>
								<tr>
									<td>
										<Link href="https://www.andasan.com">
											<Img
												width="22"
												height="22"
												src={`${baseUrl}/logo-square.png`}
											/>
										</Link>
									</td>
									<td>
										<Link href="https://www.andasan.com">
											<Img
												width="28"
												height="28"
												src={`${baseUrl}/icons8-facebook-48.png`}
											/>
										</Link>
									</td>
									<td>
										<Link href="https://www.andasan.com">
											<Img
												width="28"
												height="28"
												src={`${baseUrl}/icons8-linkedin-48.png`}
											/>
										</Link>
									</td>
									<td>
										<Link href="https://www.andasan.com">
											<Img
												width="28"
												height="28"
												src={`${baseUrl}/icons8-twitter-squared-48.png`}
											/>
										</Link>
									</td>
									<td>
										<Link href="https://www.andasan.com">
											<Img
												width="28"
												height="28"
												src={`${baseUrl}/icons8-youtube-48.png`}
											/>
										</Link>
									</td>
									<td>
										<Link href="https://www.andasan.com">
											<Img
												width="28"
												height="28"
												src={`${baseUrl}/icons8-instagram-48.png`}
											/>
										</Link>
									</td>
								</tr>
							</table>
						</Section>
						<Img width="540" height="48" src={`${baseUrl}/footer.png`} />
					</Section>
					<Section style={{ ...paragraphContent, paddingBottom: 30 }}>
						<Text
							style={{
								...paragraph,
								fontSize: '12px',
								textAlign: 'center',
								margin: 0,
							}}
						>
							© 2024 CornerMail
						</Text>
					</Section>
				</Container>
			</Section>
		</Html>
	);
}

export default EmailTemplate;

const fontFamily =
	'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

const main = {
	backgroundColor: '#dbddde',
};

const sectionLogo = {
	padding: '0 40px',
};

const headerBlue = {
	width: 0,
	marginRight: 0,
};

const container = {
	margin: '30px auto',
	width: '610px',
	backgroundColor: '#fff',
	borderRadius: 5,
	overflow: 'hidden',
	maxWidth: '100%',
};

const containerContact = {
	backgroundColor: '#f0fcff',
	width: '90%',
	borderRadius: '5px',
	overflow: 'hidden',
	marginBottom: 20,
};

const heading = {
	fontFamily,
	fontSize: '14px',
	lineHeight: '26px',
	fontWeight: 700,
	color: '#004dcf',
};

const paragraphContent = {
	padding: '0 40px',
};

const paragraphList = {
	paddingLeft: 40,
};

const paragraph = {
	fontFamily,
	fontSize: '14px',
	lineHeight: '22px',
	color: '#3c4043',
};

const link = {
	...paragraph,
	color: '#004dcf',
};

const hr = {
	borderColor: '#e8eaed',
	margin: '20px 0',
};
