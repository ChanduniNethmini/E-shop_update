const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const clientId = process.env.GMAIL_CLIENT_ID;
const clientSecret = process.env.GMAIL_CLIENT_SECRET;
const redirectUri = process.env.GMAIL_REDIRECT_URI;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
oAuth2Client.setCredentials({ refresh_token: refreshToken });
async function main() {
	const accessToken = await oAuth2Client.getAccessToken();

	transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			clientId,
			clientSecret,
			refreshToken,
			accessToken,
			user: "priyankara96.github@gmail.com"
		},
	});
}
main();


let sendEmail = (emailTemplate) => {
	transporter.sendMail(emailTemplate, (err, info) => {
		if(err) {
			console.log(err)
        }else{
			console.log('Email sent: ', info.response)
		}
	});
};

module.exports = { sendEmail };
