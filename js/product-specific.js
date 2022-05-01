const detailsContainer = document.querySelector(".product_details");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = "https://orvoll.no/rainydays/wp-json/wc/store/products" + id;

console.log(url);


async function productDetails() {

    try {
        const response = await fetch(url);
        const details = await response.json();
        
        console.log(details);

        const headTitle = document.querySelector ("title");
        headTitle.innerHTML = details[0].name;


        createDetailsHtml(details);

    }
    catch(error) {
        detailsContainer.innerHTML = "Oh darn, something went wrong!";
    }   

}

productDetails();

function createDetailsHtml(details) {
    detailsContainer.innerHTML = `<h1>${details[0].name}</h1>
                                        <img class="image" src="${details[0].image_url}" alt="Image of ${details[0].name}">
                                        <div class="product-list">
                                        <div>Description: ${details[0].description}</div> 
                                        </div>`;
}

