import { Table } from 'react-bootstrap'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { ItemCounter } from '../itemCounter/itemCounter'

export const ItemsTable = ({ items, onAdd, controllable, onRemove }) => {
	console.log(items, "ITEMS")
	return (
		<Table responsive className="cartTable">
			<tbody>
				{items.map((item) => (

					<tr key={item.item.id} className="cartTableItem">
						<td><img src={item.item.image} className="listImage" alt={`item-${item.item.id}`} /></td>
						{controllable ?
							<td>
								<ItemCounter quantity={item.quantity} onAdd={(e) => onAdd(e, item.item.id)} />
							</td>
							:
							<td><h5>x{item.quantity}</h5></td>
						}
						<td><h5>{item.item.name.substring(0, 20)}</h5></td>
						<td><h5>${item.item.price * item.quantity}</h5></td>
						{controllable &&
							<td className="removeSpan" onClick={(e) => onRemove(item.item.id)}>
								<p className="remove"><IoCloseCircleOutline /></p>
							</td>
						}
					</tr>
				))}
			</tbody>
		</Table>
	)
}
