import CartSideBar from "./components/CartSideBar/CartSideBar";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";
import ToastNotif from "./components/ToastNotif/ToastNotif";
import { useShoppingCart } from "./context/CartContext";

function Layout() {
  const { toast, closeToast } = useShoppingCart();

  return (
    <>
    <NavBar></NavBar>
    <CartSideBar></CartSideBar>
    {toast && (
      <ToastNotif
        key={toast.id}
        message={toast.message}
        onClose={closeToast} 
      />

    )}
    <Outlet></Outlet>
    </>
  )
}

export default Layout;