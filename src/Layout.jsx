import CartSideBar from "./components/CartSideBar/CartSideBar";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";
import ToastNotif from "./components/ToastNotif/ToastNotif";
import { useShoppingCart } from "./context/CartContext";

function Layout() {
  const { toastMessage, closeToast } = useShoppingCart();

  return (
    <>
    <NavBar></NavBar>
    <CartSideBar></CartSideBar>
    {toastMessage && (
      <ToastNotif message={toastMessage} onClose={closeToast} />
    )}
    <Outlet></Outlet>
    </>
  )
}

export default Layout;