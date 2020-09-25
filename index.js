const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const nodemailMailgun = require('nodemailer-mailgun-transport');
const serviceAccount = require("./ServiceAccountKey");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mood-survey-app.firebaseio.com'
});
const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'frontend/build')));
if (process.env.STAGE === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
    });
}

const auth = {
    auth: {
        api_key: process.env.NODE_MAILER_API_KEY,
        domain: process.env.NODE_MAILER_DOMAIN
    }
}
app.post('/api/send-email', async (req, res) => {
    const token = req.get("Authorization");
    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        let uid = decodedToken.uid;
    } catch (e) {
        return res.status(404).send({ error: "Invalid Token" });
    }


    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport(nodemailMailgun(auth));
        const mailOptions = {
            from: "aysenur.albayrak7@gmail.com",
            to: req.body.email,
            subject: "Mood Survey",
            text: `Here is the survey link: https://react-mood-survey-app.herokuapp.com/survey/${req.body.key} `
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(404).send();
            }
            return res.status(200).send();
        })
    })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})