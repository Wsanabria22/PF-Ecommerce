const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'william.sanabriap@gmail.com',
        pass: 'acalzbtllqppetrv'
    },
    tls:{rejectUnauthorized:false}
});

mailTransporter.verify().then(() => {
  console.log('Redy to send emails')
});

const deliverMail = async (email, subject, text, html) =>{
    try{
        let mailDetails = {
            from: 'william.sanabriap@gmail.com',
            to: `${email}`,
            subject: `${subject}`,
            text: `${text}`,
            html: `${html}`
        };
        await mailTransporter.sendMail(mailDetails);
        return true
    }catch(error){
        console.log('Send mail error;', error);
        return false
    }
}
module.exports = { deliverMail }

