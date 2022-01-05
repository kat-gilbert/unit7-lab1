let body = document.querySelector("body");

const promise = fetch("http://localhost:3000/cart-items")
.then(results => results.json());


promise.then(data => {
    for (let i = 0; i < 10; i++ ) {
        console.log(data[i]);

        let h3 = document.createElement("h3");
        h3.innerText = (data[i].product);

        let p = document.createElement("p");
        p.innerText = "Price: " + (data[i].price);

        let q = document.createElement("p");
        q.innerText = "Quantity: " + (data[i].quantity);
    
        body.append(h3); 
        body.append(p); 
        body.append(q); 
    }});

