import './itemCounter.css';

export const ItemCounter = ({ tittle, onAdd, quantity }) => {
    return (
        <div className="counterContainer">
            <p className="counterTittle">{tittle}</p>
            <div className="counter">
                <div className="buttonCounter" onClick={(e) => onAdd(-1)}>-</div>
                <p>{quantity}</p>
                <div className="buttonCounter" onClick={(e) => onAdd(1)}>+</div>
            </div>
        </div>
    )
}