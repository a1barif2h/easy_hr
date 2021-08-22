const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const config = require('./config.js')
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials( { refresh_token : config.refreshToken } )

const sendMail = async (subject, mailList, message, res) => {
    const accessToken = OAuth2_client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.user,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken
        }
    })

    const mailOptions = {
        from: `easy-hr <${config.user}>`,
        to: mailList,
        subject: subject,
        html: getHtmlMessage(message)
    }


    await transport.sendMail(mailOptions, (error, result) => {
        if (error) {
            res.status(422).json({error: 'Something went wrong', err: error})
            
        } else {
            res.status(200).json({success: 'Email send success.', result})
        }

        transport.close()
        
    })
}

const getHtmlMessage = (message) => {
    return `
        <h5>Hi, </h5>
        <p>${message}</p>
    `
}

module.exports = sendMail
