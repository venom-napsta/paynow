const { Paynow } = require('paynow');

const paynow = new Paynow("12942", "f167b715-64c1-49d6-9f12-7e941eeff538");

paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";

makePayment();

async function makePayment () {
    const ref = new Date().getTime();

    const payment = paynow.createPayment(`Invoice ${ref}`, 'napstakid@gmail.com');

    payment.add("Oranges", 30);
    payment.add("Bread", 15);

    try {
        const response = await paynow.sendMobile(payment, '0779605350', 'ecocash');
        if (response && response.success) {
            console.log(response)
        } else {
            console.log(response);
        }
    } catch (e) {
        console.log(e);
    }
}