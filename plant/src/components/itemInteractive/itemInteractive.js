import { useState, useContext } from 'react';
import { ItemCounter } from '../itemCounter/itemCounter'
import { DropdownPlantr } from '../dropdownPlantr/dropdownPlantr'
import { ButtonPlantr } from '../buttonPlantr/buttonPlantr'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi'
import { CartContext } from '../../context/cartContext'
import './itemInteractive.css';

export const ItemInteractive = ({ item, stock, size, variety }) => {
	const [quantity, setQuantity] = useState(1);
	const [purchase, setPurchase] = useState(false);
	const { addItem } = useContext(CartContext)
	const propertiesRequired = ['category', 'id', 'name', 'price', 'image', 'stock'];
	const filteredItem = (raw) => Object.keys(raw)
		.filter(key => propertiesRequired.includes(key))
		.reduce((obj, key) => {
			obj[key] = raw[key];
			return obj;
		}, {});

	const handleClick = (data) => {
		if (quantity !== stock) {
			if (quantity !== 1) {
				setQuantity(quantity + data)
			} else {
				if (data === 1) {
					setQuantity(quantity + data)
				}
			}
		} else {
			if (quantity !== 1) {
				if (data === -1) {
					setQuantity(quantity + data)
				}
			}
		}
	}

	const finishPurchase = () => {
		setPurchase(true)
		addItem(filteredItem(item), quantity)
	}

	return (
		<div>
			{
				stock > 0 ?
					purchase ?
						<div className="finishPurchaseContainer">
							<Link to='/cart'>
								<ButtonPlantr color='light'>Finalizar compra <FiArrowRight /></ButtonPlantr>
							</Link>
							<Link to='/'>
								<p className="continueBuying"> Seguir comprando <FiShoppingCart /></p>
							</Link>
						</div>
						:
						<div>
							<div className="plantOptions">
								<ItemCounter tittle="Quantity" stock={stock} onAdd={handleClick} quantity={quantity} />
								<DropdownPlantr tittle="Size" options={size} />
								<DropdownPlantr tittle="Variety" options={variety} />
							</div>
							<p className="availableStockText">{stock} Available{stock > 1 && 's'}</p>
							<div onClick={() => finishPurchase()}>
								<ButtonPlantr><FiShoppingCart /> Add to cart</ButtonPlantr>
							</div>
						</div>
					:
					purchase ?
						<div className="finishPurchaseContainer">
							<Link to='/cart'>
								<ButtonPlantr color='light'>Finalize purchase <FiArrowRight /></ButtonPlantr>
							</Link>
							<Link to='/'>
								<p className="continueBuying"> Keep buying <FiShoppingCart /></p>
							</Link>
						</div>
						:
						<p>No hay stock</p>
			}
		</div>
	)
}
