const cartModel = require("../models/cart-model");

const getCartItems = async (req, res) => {
    
    const user = req.user;
    const cartId = user.cart;


    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    try {
        let cartData = await cartModel.findById(cartId).populate('cartItems.item');

        res.status(200).json({
            message: "Cart Data successfully retrived",
            data: cartData
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }

}

const addToCart = async (req, res) => {

    const user = req.user;
    const { medicineId, name, price } = req.body;


    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    let cartId = user.cart;

    try {
        let cartData = await cartModel.findById(cartId);
        cartData.cartItems = [...cartData.cartItems, { item: medicineId, name, quantity: 1 }];
        cartData.totalPrice += Number(price);

        await cartData.save();

        res.status(200).json({
            message: "Item added to the cart!",
            data: cartData
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }


}

const updateQuantity = async (req, res) => {

    const user = req.user;
    const { medicineId, type, price } = req.body;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart!' })
    }

    let cartId = user.cart;

    try {

        let cartData = await cartModel.findById(cartId);

        cartData.cartItems = cartData.cartItems.map((cartItem) => {
            if (cartItem.item == medicineId) {
                return {
                    item: cartItem.item,
                    name: cartItem.name,
                    quantity: cartItem.quantity + (type === "increment" ? +1 : -1)
                }
            } else {
                return cartItem;
            }
        })

        cartData.totalPrice = (type === 'increment' ? + 1 : -1) * price + cartData.totalPrice;
        cartData.totalPrice.toFixed(2);

        await cartData.save();

        res.status(200).json({
            message: "Item added to the cart!",
            data: cartData
        })

    } catch (error) {
        res.status(501).json({
            message: "Item\'s quantity couldn\'t be updated"
        })
    }
}
const deleteItemFromCart = async (req, res) => {

    const user = req.user;
    const { medicineId, price, quantity } = req.body;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    let cartId = user.cart;

    try {

        const cartData = await cartModel.findById(cartId);

        const newCartItems = cartData.cartItems.filter((cartItem) => cartItem.item != medicineId)

        cartData.cartItems = [...newCartItems]
        cartData.totalPrice = cartData.totalPrice - (price*quantity);

        await cartData.save();

        res.status(200).json({
            message: "Item deleted from cart!",
            data: cartData
        })

    } catch (error) {
        res.status(501).json({
            message: "Item\'s couldn\'t be deleted"
        })
    }
}


module.exports = {
    getCartItems,
    addToCart,
    updateQuantity,
    deleteItemFromCart
}