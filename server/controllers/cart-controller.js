const cartModel = require("../models/cart-model");

const getCartItems = async (req, res) => {
    const user = req.user;
    const cartId = user.cart;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    try {
        let cartData = await cartModel.findById(cartId);
      
        res.status(200).json({
            message: "Cart Data successfully retrived",
            data: cartData
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

const addToCart = async (req, res) => {

    const user = req.user;
    const { medicineId } = req.body;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    let cartId = user.cart;

    try {
        let cartData = await cartModel.findById(cartId);
        cartData.cartItems = [...cartData.cartItems, { item: medicineId, quantity: 1 }];

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
    const { medicineId, type } = req.body;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    let cartId = user.cart;

    try {

        let cartData = await cartModel.findById(cartId);

        cartData.cartItems = cartData.cartItems.map((cartItem) => {
            if (cartItem.item == medicineId) {
                return {
                    item: cartItem.item,
                    quantity: cartItem.quantity + (type === "increment" ? +1 : -1)
                }
            } else {
                return cartItem;
            }
        })

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
    const { medicineId } = req.body;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    let cartId = user.cart;

    try {

        const cartData = await cartModel.findById(cartId);


        const newCartItems = cartData.cartItems.filter((cartItem) => cartItem.item != medicineId)

        cartData.cartItems = [...newCartItems]

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