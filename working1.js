// const express = require('express');
// const app = express();
// var http = require('http').createServer(app);
// var cors = require('cors');
const { Paynow } = require("paynow");
const shortid = require('shortid');

let paynow = new Paynow("12941", "b37111b6-e4d4-4854-9085-2620cbb6e778");

paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";


let _id = shortid.generate()
let payment = paynow.createPayment(`Invoice ${_id}`, "napstakid@gmail.com");

payment.add("Bananas", 4.5);
payment.add("Apples", 3.8);

console.log("added items");

paynow.sendMobile(payment, "0777000000", "ecocash").then(response => {
    // Check if request was successful
    if (response.success) {
        console.log(response);

    //     console.log("Instructions",response.instructions);
    //   // Get the link to redirect the user to, then use it as you see fit
    //   let link = response.redirectUrl;
    } else {
      console.log(response.error)
  }
  });



  //2 semis on line 189
  //initMobile method