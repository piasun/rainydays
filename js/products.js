const baseURL = "https://orvoll.no/rainydays/wp-json/wc/store/products";
const productContainer = document.querySelector(".products");
const perPage = document.querySelector(".per-page-selection");
const categories = document.querySelectorAll(".categories");
const searcButton = document.querySelector(".search-button");


async function getProducts(url) {
	const response = await fetch(url);
	const products = await response.json();
	products.forEach(function(product){
	productContainer.innerHTML += `
    <div class="product"><h2>${product.name}</h2>
	<div class="product-image" style="background-image:url(${products.images[0].src})"></div>
    </div>`
    })
}	
	
getProducts(baseURL);

perPage.onchange = function(event){
    const newUrl = baseURL + `?per_page=${event.target.value}`;
    productContainer.innerHTML = "";
    getProducts(newUrl);
}

categories.forEach(function(category){
    category.onclick = function(event){
        let newUrl;
        if(event.target.id === "featured"){
            newUrl = baseURL + "?featured=true";
        }
        else{
            const categoryChosen = event.target.value;
            newUrl = baseURL + `?category=${categoryChosen}`
        }
        productContainer.innerHTML = "";
        getProducts(newUrl);
    }
})

searcButton.onclick = function(){
    const searchInput = document.querySelector("#search-input").value;
    const newUrl = baseURL + `?search=searchInput`;
    productContainer.innerHTML = "";
    getProducts(newUrl);
}