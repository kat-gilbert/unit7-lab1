import express from "express";
import Cart from "../models/cart";
const cartRoutes = express.Router();

let cart: Cart[] = [
    {id: 1, product: "jalapeno", price: 0.50, quantity: 4},
    {id: 2, product: "tomato", price: 1, quantity: 2},
    {id: 3, product: "onion", price: 0.75, quantity: 2},
    {id: 4, product: "sparkling water", price: 2, quantity: 4},
    {id: 5, product: "vitamins", price: 20, quantity: 1}
];
let nextId: number = 6;

//1
cartRoutes.get("/", function (req, res) {
    let cartItems: Cart[] = cart;
    let prefix: string = req.query.prefix as string;
    let pageSize: string = req.query.pageSize as string;
    let maxPriceParam: string = req.query.maxPrice as string;

    if (maxPriceParam) {
        let maxPrice: number = parseFloat(maxPriceParam);
        cartItems = cart.filter(cart => cart.price <= maxPrice);
    }
    if (prefix) {
        cartItems = cart.filter(cart => cart.product.startsWith(prefix));
    }
    if (pageSize) {
        let newPageSize: number = parseFloat(pageSize);
        cartItems = cart.slice(0, newPageSize);
    }

    res.json(cartItems);
    res.status(200);
});

//2
cartRoutes.get("/:id", function(req, res) {

        for (let i = 0; i < cart.length; i++) {
        if (parseInt(req.params.id) === cart[i].id){
            res.json(cart[i]);
            break;
        }
    }
    res.status(404);
    res.send({"error": "ID Not Found"});
});

//3
cartRoutes.post("/", function(req,res) {
    let newItem: Cart = req.body;
    newItem.id = nextId;
    nextId += 1;
    cart.push(newItem);

    res.status(201);
    res.json(newItem);
})

//4
cartRoutes.put("/:id", function(req, res) {
    let shopInfo = req.body;

    for (let i = 0; i < cart.length; i++) {
        if (parseInt(req.params.id) === cart[i].id){
            cart[i] = shopInfo;
        }}
    res.json(shopInfo);
    res.status(200);
});

//5
cartRoutes.delete("/:id", function (req, res) {
    let inputId: number = Number.parseInt(req.params.id);

    let cartItemIndex: number = cart.findIndex(cart => cart.id === inputId);
    console.log(cartItemIndex);
    cart.splice(cartItemIndex, 1);

    res.status(204);
    res.json("");
})

export default cartRoutes;