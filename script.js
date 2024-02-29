let currency = 'INR';

function toggleCurrencyDropdown() {
    const dropdown = document.getElementById('currency-option');
    dropdown.classList.toggle('show');

}
function setCurrency(newCurrency) {
    currency = newCurrency;
    updatePrices();
}

function updatePrices() {
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(element => {
        const price = parseFloat(element.dataset.price);
        let convertedPrice;

        switch (currency) {
            case 'USD':
                convertedPrice = price *0.012;
                break;
            case 'EUR':
                convertedPrice = price *0.011;
                break;
            case 'JPY':
                convertedPrice = price *1.82;
                break;
            default:
                convertedPrice = price;
                break;
        }

        const currencySign = getCurrencySign(currency);
        const formattedPrice = currencySign + ' ' + convertedPrice.toLocaleString(undefined,{maximumFractionDigits: 2});
        element.textContent = formattedPrice;
    });
    const dropdown = document.getElementById(currency-option);
    if (dropdown.classList.contains('show')) {
        toggleCurrencyDropdown();
    }
}

function getCurrencySign(currency) {
    switch (currency) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'JPY':
            return '\u00A5';
        default:
            return '\u20B9';
    }
}




const sortSelect = document.getElementById('sort-select');
const carList = document.querySelector('.car-list');

sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    sortCars(sortBy);
});

function sortCars(sortBy) {
    const cars = Array.from(carList.children);
    
    if (sortBy === 'low-to-high') {
        cars.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').dataset.price);
            const priceB = parseFloat(b.querySelector('.price').dataset.price);
            return priceA - priceB;
        });
    } else if (sortBy === 'high-to-low') {
        cars.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').dataset.price);
            const priceB = parseFloat(b.querySelector('.price').dataset.price);
            return priceB - priceA;
        });
    }
    
    carList.innerHTML = '';
    cars.forEach(car => carList.appendChild(car));
}





function updateTotalPrice(card) {
    var priceElement = card.querySelector('.price');
    var quantityElement = card.querySelector('.quantity');
    var totalPriceElement = card.querySelector('.total-price');

    var price = parseFloat(priceElement.getAttribute('data-price'));
    var quantity = parseInt(quantityElement.innerText);
    var totalPrice = price * quantity;

    totalPriceElement.innerText = 'Total: ₹' + totalPrice.toLocaleString();
}

function incrementQuantity(button) {
    var quantityElement = button.parentNode.querySelector('.quantity');
    var quantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = quantity + 1;
    updateTotalPrice(button.closest('.car-card'));
    updateQuantityPrice(button.closest('.car-card'));
}

function decrementQuantity(button) {
    var quantityElement = button.parentNode.querySelector('.quantity');
    var quantity = parseInt(quantityElement.innerText);
    if (quantity > 0) {
        quantityElement.innerText = quantity - 1;
        updateTotalPrice(button.closest('.car-card'));
        updateQuantityPrice(button.closest('.car-card'));
    }
}

function updateQuantityPrice(card) {
    var priceElement = card.querySelector('.price');
    var quantityElement = card.querySelector('.quantity');
    var totalPriceElement = card.querySelector('.total-price');

    var price = parseFloat(priceElement.getAttribute('data-price'));
    var quantity = parseInt(quantityElement.innerText);
    var totalPrice = price * quantity;

    var convertedTotalPrice = convertCurrency(totalPrice, currency); 
    var formattedTotalPrice = formatCurrency(convertedTotalPrice, currency); 
    totalPriceElement.innerText = 'Total: ' + formattedTotalPrice;
}


