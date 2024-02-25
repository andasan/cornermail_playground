import {
	SendSmtpEmail,
	TransactionalEmailsApi,
	TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo';

import { config } from '@/utils/config';

const apiInstance = new TransactionalEmailsApi();
const sendSmtpEmail = new SendSmtpEmail();

apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, config.brevoApiKey);

export { apiInstance, sendSmtpEmail };
