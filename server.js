const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Telegram Bot Token and Chat ID
const telegramToken = '7401377630:AAEVTBujgzhXme3geZetIKeKHeHo6dpxZ2U';
const chatId = '-1002391853855';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/order', (req, res) => {
            const { name, phone, novaPoshta, cart } = req.body;

            // Create the message to be sent
            const message = `Замовлення:
    Ім'я: ${name}
    Телефон: ${phone}
    Відділення Нова пошта: ${novaPoshta}
    Корзина:
    ${cart.map(item => `- ${item.name}: ${item.price} грн`).join('\n')}
    Загальна вартість: ${cart.reduce((sum, item) => sum + item.price, 0)} грн`;
    
    // Send the message to Telegram
    axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    }).then(() => {
        res.json({ success: true });
    }).catch(error => {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});