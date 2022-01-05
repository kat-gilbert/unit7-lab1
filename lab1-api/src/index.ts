import express from "express";
import cartRoutes from "./routes/cart.routes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/cart-items", cartRoutes);

app.listen(port, function() {
    console.log(`Listening on ${port}`);
})