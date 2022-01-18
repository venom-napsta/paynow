const express = require('express');
const app = express();
var http = require('http').createServer(app);
const { Paynow } = require("paynow");
const shortid = require('shortid');

let paynow = new Paynow("12941", "b37111b6-e4d4-4854-9085-2620cbb6e778");

paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";

let _id = shortid.generate()
const payment = paynow.createPayment(`Invoice ${_id}`, 'napstakid@gmail.com');
payment.add("Oranges", 30);
payment.add("Bread", 15);

paynow.sendMobile(
    
    // The payment to send to Paynow
    payment, 

    // The phone number making payment
    '0777000000',
    
    // The mobile money method to use. 
    'ecocash' 

).then(function(response) {
    if(response.success) {
        // These are the instructions to show the user. 
        // Instruction for how the user can make payment
        let instructions = response.instructions // Get Payment instructions for the selected mobile money method

        // Get poll url for the transaction. This is the url used to check the status of the transaction. 
        // You might want to save this, we recommend you do it
        let pollUrl = response.pollUrl; 

        console.log(instructions)

    } else {
        console.log(response.error)
    }
}).catch(ex => {
    // Ahhhhhhhhhhhhhhh
    // *freak out*
    console.log('Your application has broken an axle', ex)
});

/*
makePayment();

async function makePayment () {

    const payment = paynow.createPayment(`Invoice ${_id}`, 'napstakid@gmail.com');

    payment.add("Oranges", 30);
    payment.add("Bread", 15);

    try {
        const response = await paynow.sendMobile(payment, '0777000000', 'ecocash');
        if (response && response.success) {
            console.log(response)
            let instructions = response.instructions
            console.log("Instructions", instructions);
        } else {
            console.log(response);
        }
    } catch (e) {
        console.log(e);
    }
} */