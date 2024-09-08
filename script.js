// Функция для обновления таймера
function updateTimer(timerId, endDate) {
    const timerElement = document.getElementById(timerId);

    function update() {
        const now = new Date();
        const remainingTime = endDate - now;

        if (remainingTime <= 0) {
            timerElement.textContent = 'Час вийшов!';
            clearInterval(interval);
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        timerElement.textContent = `${days} днів ${hours}:${minutes}:${seconds}`;
    }

    update(); // Initial update
    const interval = setInterval(update, 1000);
}

// Функция для добавления продукта в корзину
let cart = [];

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    cartItems.innerHTML = cart.map(item => `
        <div>
            <img src="${item.image}" alt="${item.name}" style="width: 100px;">
            <p>${item.name} - ${item.price} грн</p>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `${total} грн`;
}

// Функция для отправки формы заказа
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const novaPoshta = document.getElementById('novaPoshta').value;

    const orderData = {
        name,
        phone,
        novaPoshta,
        cart
    };

    fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        }).then(response => response.json())
        .then(data => {
            alert('Ваше замовлення оформлено!');
            cart = [];
            updateCart();
        }).catch(error => {
            alert('Сталася помилка при оформленні замовлення.');
        });
});

// Настройка таймеров
const timers = [
    { id: 'timer1', endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { id: 'timer2', endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { id: 'timer3', endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { id: 'timer4', endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { id: 'timer5', endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { id: 'timer6', endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
];

timers.forEach(timer => updateTimer(timer.id, timer.endDate));