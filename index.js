const { Paynow } = require("paynow");
// const express = require('express');
// const app = express();
// var http = require('http').createServer(app);
const shortid = require('shortid');

let paynow = new Paynow("12942", "f167b715-64c1-49d6-9f12-7e941eeff538");

paynow.resultUrl = "http://localhost:3000/success"; //whrr they send conf
paynow.returnUrl = "http://localhost:3000/fail"; //ridrection after payment
// The return url can be set at later stages. You might want to do this if you want to pass data to the return url (like the reference of the transaction)

let _id = shortid.generate()
let payment = paynow.createPayment(`Invoice ${_id}`, "napstakid@gmail.com");
// Passing in the name of the item and the price of the item
payment.add("Bananas", 0.25);
payment.add("Apples", 0.14);
// Save the response from paynow in a variable

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