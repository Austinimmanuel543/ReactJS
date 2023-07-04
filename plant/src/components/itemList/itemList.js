import { Row } from 'react-bootstrap';
import { useContext } from 'react'
import '../../App.css';
import './itemList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Item } from '../item/item';
import { ItemLoading } from '../itemLoading/itemLoading';
import { Notice } from '../notice/notice'
import { WishListContext } from '../../context/wishListContext'

export const ItemList = ({ plants }) => {
	console.log(plants, "plants")
	const { isInWishList } = useContext(WishListContext)
	if (plants !== 'loading') {
		if (plants === 'empty') {
			return (
				<Notice header="Aun no hay plantas en esta categoria" bg={false} buttons={[{ text: 'Volver al inicio', link: '/', icon: 'home' }]} />
			)
		} else {
			return (
				<Row>
					{plants.map((plant) => (
						<Item
							key={plant?.id}
							id={plant?.id}
							name={plant?.name}
							description={plant?.description}
							price={plant?.price}
							stock={plant?.stock}
							whishlisted={isInWishList(plant?.id)}
							plant={plant}
							image={plant?.image}
						/>
					))}
				</Row>
			)
		}
	} else {
		return (
			<Row>
				<ItemLoading />
				<ItemLoading />
				<ItemLoading />
			</Row>
		)
	}
}
