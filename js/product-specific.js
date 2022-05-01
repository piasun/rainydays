const detailsContainer = document.querySelector(".product_details");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = "https://orvoll.no/rainydays/wp-json/wc/store/products/" + id;

console.log(url);


async function productDetails() {

    try {
        const response = await fetch(url);
        const details = await response.json();
        
        console.log(details);

        const headTitle = document.querySelector ("title");
        headTitle.innerHTML = details.name;


        createDetailsHtml(details);

    }
    catch(error) {
        detailsContainer.innerHTML = "We apologuise, something went wrong! Please go back and try again";
    }   

}

productDetails();

function createDetailsHtml(details) {
    detailsContainer.innerHTML = `<h1>${details.name}</h1>
                                        <div class="image" src="${details.images.src}" alt="Image of ${details.name}"></div>
                                        <div>Description: ${details.description}</div> 
                                        </div>`;
}

