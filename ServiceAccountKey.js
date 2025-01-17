module.exports = {
  "type": "service_account",
  "project_id": "mood-survey-app",
  "private_key_id": process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  "private_key": process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-cem88@mood-survey-app.iam.gserviceaccount.com",
  "client_id": "process.env.SERVICE_ACCOUNT_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.SERVICE_ACCOUNT_CLIENT_CERT_URL
}
