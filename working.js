const express = require('express');
const app = express();
var http = require('http').createServer(app);
var cors = require('cors');
const { Paynow } = require("paynow");
const shortid = require('shortid');

let paynow = new Paynow("12941", "b37111b6-e4d4-4854-9085-2620cbb6e778");

paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";


let _id = shortid.generate()
let payment = paynow.createPayment(`Invoice ${_id}`, "napstakid@gmail.com");

// Passing in the name of the item and the price of the item
payment.add("Bananas", 4.5); //title, amnt, qty
payment.add("Apples", 3.8);

console.log("added items");

paynow.send(payment).then(response => {
    // Check if request was successful
    if (response.success) {
        console.log(response);
        
    }
  });