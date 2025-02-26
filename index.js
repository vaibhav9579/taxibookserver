const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_SID;  
const authToken = process.env.TWILIO_AUTH_TOKEN;  
const twilioPhone = process.env.TWILIO_PHONE;  
const ownerPhone = process.env.OWNER_PHONE;  

const client = require("twilio")(accountSid, authToken);

app.post("/send_sms", (req, res) => {
    const { pickup, drop, mobile, name } = req.body;

    const message = `New Taxi Booking:
    Name: ${name}
    Pickup: ${pickup}
    Drop: ${drop}
    Customer No: ${mobile}`;

    client.messages
        .create({
            body: message,
            from: twilioPhone,
            to: ownerPhone,
        })
        .then((message) => res.json({ success: true, messageId: message.sid }))
        .catch((error) => res.status(500).json({ success: false, error }));
});

app.listen(3000, () => console.log("Server running on port 3000"));