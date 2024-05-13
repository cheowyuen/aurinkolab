import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "deion.casper@ethereal.email",
        pass: "ZhXnG2PtCTYhenMNs3",
    },
});

export default transporter;