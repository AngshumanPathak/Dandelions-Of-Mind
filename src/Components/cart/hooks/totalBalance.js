import { useState, useEffect } from "react";

const useTotalBalance = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const totalAmount = () => {
            let p = 0, d = 0, dc = 0;
            cartItems.forEach(item => {
                p += item.price.mrp * item.quantity;
                d += (item.price.mrp - item.price.cost) * item.quantity;
                dc += 40;
            });
            setPrice(p);
            setDiscount(d);
            setDeliveryCharges(dc);
            setTotalPrice(p - d + dc);
        };

        totalAmount();
    }, [cartItems]);

    return { price, discount, deliveryCharges, totalPrice };
};

export default useTotalBalance;