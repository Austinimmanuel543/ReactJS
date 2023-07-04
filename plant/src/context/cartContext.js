import { createContext, useState, useEffect } from 'react'
import { getFirestore } from '../../src/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const [orderSummary, setOrderSummary] = useState('')
    const [orderId, setOrderId] = useState('')
    const calculateTotal = (arr) => {
        return arr.reduce((sum, i) => {
            return sum + (i.item.price * i.quantity)
        }, 0)
    }

    useEffect(() => {
        let totalPrice = 0
        cartItems.forEach((i) => {
            totalPrice = totalPrice + i.quantity
        })
        setQuantity(totalPrice)
        setTotal(calculateTotal(cartItems))
    }, [cartItems])

    const isInCart = (id) => {        
        let checkId = cartItems.filter((i) => i.item.id === id)
        if (checkId.length) {
            return [true, checkId[0].quantity]
        }
        return [false]
    }

    const addItem = (item, quantity) => {
        const newItems = cartItems.filter((it) => it.item.id !== item.id)
        let inCart = isInCart(item.id)
        if (inCart[0]) {
            quantity = inCart[1] + quantity
        }
        setCartItems([...newItems, {
            'item': item,
            'quantity': quantity
        }])
    }

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter((it) => it.item.id !== itemId))
    }

    const clearCart = () => {
        setCartItems([])
        setOrderId('')
        setOrderSummary('')
    }

    useEffect(() => {
        const send = async () => {
            try {
                const db = getFirestore();
                const orders = db.collection('orders')
                const batch = db.batch()
                const { id } = await orders.add(orderSummary);
                cartItems.forEach((it) => {
                    const itemRef = db.collection('items').doc(it.item.id)
                    batch.update(itemRef, { stock: (it.item.stock - it.quantity) })
                })
                batch.commit()
                setOrderId(id)
                setCartItems([])
            } catch (err) {

            }
        }
        send()

    }, [orderSummary])

    const changeItemQuantity = (e, id) => {
        let itemsUpdated = [...cartItems]
        itemsUpdated.map((item, i) => {
            if (item.item.id === id) {
                if (item.quantity !== item.item.stock) {
                    if (item.quantity !== 1) {
                        itemsUpdated[i].quantity = item.quantity + e
                    } else {
                        if (e === 1) {
                            itemsUpdated[i].quantity = item.quantity + e
                        }
                    }
                } else {
                    if (item.quantity !== 1) {
                        if (e === -1) {
                            itemsUpdated[i].quantity = item.quantity + e
                        }
                    }
                }
            }
        })
        setCartItems(itemsUpdated)
    }

    const sendOrder = buyerData => {
        setOrderSummary({
            buyer: buyerData,
            items: cartItems,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            total: total
        })
    }
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, quantity, addItem, removeItem, isInCart, clearCart, sendOrder, orderId, orderSummary, total, changeItemQuantity }}>
            {children}
        </CartContext.Provider>
    )
}