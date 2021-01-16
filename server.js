const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

// instantiate an express app
const app = express();
// cors
app.use(cors({ origin: "*" }));

app.use("/public", express.static(process.cwd() + "/public")); //make public static

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

app.post("/send", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message

    var mail = {
        from: email,
        to: 'khountea@gmail.com',
        subject: 'Photography Website',
        html: `<p>${name}</p>
                <p>${email}</p>
                <p>${message}</p>`
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send('Success')
        }
        transporter.close();
    });
});