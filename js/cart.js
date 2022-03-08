let items = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'blue allweather jacket',
        tag: 'mountain-blue',
        price: 799,
        inCart: 0,
    },
    {
        name: 'yellow allweather jacket',
        tag: 'mountain-yellow',
        price: 699,
        inCart: 0,
    },
    {
        name: 'red allweather jacket',
        tag: 'mountain-red',
        price: 899,
        inCart: 0,
    }, 
    {
        name: 'black allweather jacket',
        tag: 'mountain-black',
        price: 999,
        inCart: 0,
    }
];

for (let i=0; i < items.length; i++) {
    items[i].addEventListener('click', () => {
        itemNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadItemNumbers() {
    let productNumbers = localStorage.getItem('itemNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function itemNumbers(product) {
    let productNumbers = localStorage.getItem('itemNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('itemNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('itemNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }   

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if( cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));
}

function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector (".products_container");

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product"> 
                <i class="fa-solid fa-circle-xmark"></i>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
                </div>            
                `
            });

    }

}

onLoadItemNumbers();
displayCart();