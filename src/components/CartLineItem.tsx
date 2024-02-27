import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

function CartLineItem({ item, dispatch, REDUCER_ACTIONS }: PropsType) {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal = item.qty * item.price;

  const highestQty = 20 > item.qty ? 20 : item.qty;

  const optionValues = [...Array(highestQty).keys()].map((i) => i + 1);

  const options: ReactElement[] = optionValues.map((value) => {
    return (
      <option key={`opt${value}`} value={value}>
        {value}
      </option>
    );
  });
  console.log(item.name);
  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantitiy"
        onChange={onChangeQty}
      >
        {options}
      </select>
      <div className="cart__item-subtotal" aria-label="Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );
  return content;
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  (prevProps, nextProps) => {
    return prevProps.item.qty === nextProps.item.qty;
  },
);
export default MemoizedCartLineItem;
