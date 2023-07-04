import { useContext } from 'react'
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { WishListContext } from '../../context/wishListContext'
import './wishListButton.css'

export const WishListButton = ({ plant }) => {
    const { isInWishList, switchItemFromWishList } = useContext(WishListContext)
    return (
        <div onClick={(e) => switchItemFromWishList(plant)} className="wishListButton">
            {isInWishList(plant.id) ? <IoHeart /> : <IoHeartOutline />}
        </div>
    )
}