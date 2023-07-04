import './itemDetailContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { ItemDetail } from '../../components/itemDetail/itemDetail';
import { getFirestore } from '../../firebase'
import { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../context/cartContext'
import { data } from "../../MasterData/Plants"

export const ItemDetailContainer = () => {
	const { id } = useParams();
	const [plantSelected, setPlantSelected] = useState('loading')
	const { isInCart } = useContext(CartContext)

	useEffect(() => {
		if (id) {
			let index = data.findIndex(rank => rank.id === id);
			if (index == -1) {
				setPlantSelected('empty')
			} else {
				setPlantSelected(data[index])
			}
		}
	}, [id])

	return (
		<ItemDetail plant={plantSelected} inCart={isInCart(id)} />
	)
}
