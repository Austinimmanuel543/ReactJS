import { createContext, useState } from 'react'
import 'firebase/firestore'

export const WishListContext = createContext()
export const WishListProvider = ({ children }) => {
    const [wishList, setWishList] = useState([])

    const isInWishList = (id) => {
        let check = wishList.filter((wishListed) => wishListed.id === id)
        return (check.length ? true : false)
    }

    const addItemToWishList = (item) => {
        !isInWishList(item.id) && setWishList([...wishList, item])
    }

    const removeItemFromWishList = (item) => {
        setWishList(wishList.filter((wishListed) => wishListed.id !== item.id))
    }

    const switchItemFromWishList = (item) => {
        isInWishList(item.id) ?
            removeItemFromWishList(item) :
            addItemToWishList(item)
    }

    return (
        <WishListContext.Provider value={{ isInWishList, switchItemFromWishList, wishList }}>
            {children}
        </WishListContext.Provider>
    )
}
