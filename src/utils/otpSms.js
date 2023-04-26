const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env)

const sendOTPSms = async () => {

        client.messages
            .create({
                // from: `+${92}${3213435623}`,
                to: `+923213435623`,
                // channel: 'sms',
                // channel:,

                from: process.env.TWIIO_TEST_FROM_NUMBER,
                body: "Your OTp is on the way:)"
                // messagingServiceSid: process.env.TWILIO_SERVICE_SID
            },
        
        function (err, result) {

            if (err) {
                console.log("err", err)
            }
            else {
                console.log("Created message using callback");
                console.log(result.sid);
            }
        })


}


module.exports = { sendOTPSms }