import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
};
function Footer({ viewCart }: PropsType) {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <p>Shpping Cart &copy; {year} </p>
  ) : (
    <>
      <p> Total Items: {totalItems}</p>
      <p> Total Price: {totalPrice}</p>
      <p> Shopping Cart &copy; {year} </p>
    </>
  );
  return <footer className="footer">{pageContent}</footer>;
}

export default Footer;
