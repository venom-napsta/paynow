// const express = require('express');
// const app = express();
// var http = require('http').createServer(app);
// var cors = require('cors');
require('dotenv').config()
const { Paynow } = require("paynow");
const shortid = require('shortid');

let paynow = new Paynow( process.env.ID, process.env.token);

paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";


let _id = shortid.generate()
let payment = paynow.createPayment(`Invoice ${_id}`, process.env.email);

payment.add("Bananas", 4.5); //title, amnt, qty
payment.add("Apples", 3.8);

console.log("added items");

paynow.send(payment).then(response => {
    // Check if request was successful
    if (response.success) {
        console.log(response);
    }
  });