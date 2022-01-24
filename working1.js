require('dotenv').config()
const { Paynow } = require("paynow");

let paynow = new Paynow( process.env.ID, process.env.token);

paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";

let payment = paynow.createPayment("Invoice 37", process.env.email);

payment.add("Bananas", 2.5);
payment.add("Apples", 1.0);

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