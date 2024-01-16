const nodemailer = require('nodemailer');

const config = {
    service: 'gmail',
    host: 'smtp.gamil.com',
    port: 587,
    auth: {
        user: 'id',
        pass: 'app password'
    }
}

const send = async (data) => {
    const transports = nodemailer.createTransport(config);
    transports.sendMail(data, (err, info) => {
            if (err) throw err;
            else return info.response;
        }
    )
}

module.exports = {
    send
}