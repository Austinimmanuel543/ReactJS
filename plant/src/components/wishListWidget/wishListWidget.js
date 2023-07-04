import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoHeartOutline } from 'react-icons/io5';
import './wishListWidget.css'
import { OverlayTrigger, Popover, Badge } from 'react-bootstrap'
import { WishListContext } from '../../context/wishListContext'

export const WishListWidget = () => {
	const { wishList } = useContext(WishListContext)
	const popover = (
		<Popover id={`popover-positioned-bottom`}>
			<Popover.Title as="h3">{`Favoritos`}</Popover.Title>
			<Popover.Content>
				{wishList.length ?
					wishList.map((w) => (
						<Link to={`/item/${w.id}`}>
							<div className="wishListItem">
								<img src={w.image} alt="" className="wishListItemImage" />
								<p className="wishListName">{w.name}</p>
							</div>
						</Link>
					)) :
					<p className="emptyWishList">There is nothing yet</p>
				}
			</Popover.Content>
		</Popover>
	)
	return (
		<Fragment>
			<OverlayTrigger
				trigger="click"
				key="bottom"
				placement="bottom"
				rootClose
				overlay={popover}>
				<div className="wishListWidget">
					<h1>
						<IoHeartOutline />
					</h1>
					{wishList.length > 0 &&
						<Badge pill className="plantBGPrimary">
							{wishList.length}
						</Badge>
					}
				</div>
			</OverlayTrigger>
		</Fragment>
	)
}
