const productContainer = document.querySelector(".product_details");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = "https://orvoll.no/rainydays/wp-json/wc/store/products/" + id;

console.log(url);


async function productDetails() {

    try {
        const response = await fetch(url);
        const jacket = await response.json();
        
        console.log(jacket);

        const headTitle = document.querySelector ("title");
        headTitle.innerHTML = jacket.name;


        createDetailsHtml(jacket);

    }
    catch(error) {
        productContainer.innerHTML = "We apologuise, something went wrong! Please go back and try again";
    }   

}

productDetails();

function createDetailsHtml(jacket) {
    productContainer.innerHTML = `<img class=".product-image" src="${jacket.images[0].src}" alt="${jacket.images[0].alt}">
                                    <h1>${jacket.name}</h1>
                                    ${jacket.description}
                                    <h2 class="price-card">${jacket.price_html}</h2>
                                    `;
}

