const nodemailer = require('nodemailer');
const config = require('../config.json');
const { verifyToken } = require("../helpers/jwt_helper");
const myEmail = config.EMAIL_CORREO;



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: config.EMAIL_PASS
    }
});

exports.enviarCorreo = (req, res, next) => {
    try {
        const { to, message, subject, sender } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const isverify = verifyToken(token);
        if (isverify) {
            const data = {
                from: `SAA Alondra <${myEmail}>`,
                to: to,
                subject: subject,
                html: `
                    <div style="font-family: 'Trebuchet MS; padding: 10px 50px;">
                    <div style="text-align: center; width: 100%; background-color: whitesmoke; padding: 10px 50px; border-radius: 7px;">
                        <h1>${subject}</h1>
                        <br/>
                        <p style="font-size: 22px;">${message}</p>
                        <br/>
                        <span style="font-size: 12px; font-style: italic;">Firma: ${sender}</span>
                        </div>
                    </div>
                    `
            };

            transporter.sendMail(data, (err, info) => {
                if (err) {
                    console.error(`ERROR`);
                    console.error(err);
                    res.json({ err });
                    next(err);
                } else {
                    console.log(`CORRECTO`)
                    console.log(info);
                    res.json({ info });
                }
            })
        }

    } catch (e) {
        console.error(e.message);
        next(e);
        res.json(e.message)
    }



}