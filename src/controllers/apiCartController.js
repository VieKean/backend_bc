import cartService from "../services/cartService";

const Cart = async (req, res) => {
    try {
        let id_prd = req.body.product_id;
        let id_cus = req.body.customer_id;
        let price = req.body.product_price;
        let quantity = req.body.product_quantity;
        console.log("check: ", id_cus)
        let cart = await cartService.addInCart(id_cus, id_prd, price, quantity)
        res.status(200).json(cart);

    }

    catch (err) {
        console.error('Failed to fetch cart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}

const fetchCart = async (req, res) => {
    try {
        let id_cus = req.body.customer_id;
        let cart = await cartService.getCart(id_cus)
        console.log("check", cart)
        res.status(200).json(cart);

    }

    catch (err) {
        console.error('Failed to fetch cart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default { Cart, fetchCart }