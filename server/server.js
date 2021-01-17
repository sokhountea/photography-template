const transporter = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('*', (req, res) => {
    res.send('Server is working. Please post at "/send" to submit a message.')
})

const PORT = process.env.PORT || 3030;

// verify that connection to email was made well
transporter.verify(function (err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is ready to take messages");
    }
});

app.post('/send', (req, res) => {
    const mail = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: `Photography Website Contact`, // Subject line
        html: `
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <p>Message: ${req.body.message}</p>
    `
    };

    transporter.sendMail(mail, function (err, info) {
        if (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong. Please try again later'
            });
        } else {
            res.send({
                success: true,
                message: 'Thank you for your email! I will get back to you as soon as I can!'
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});