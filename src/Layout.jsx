import CartSideBar from "./components/CartSideBar/CartSideBar";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
    <NavBar></NavBar>
    <CartSideBar></CartSideBar>
    <Outlet></Outlet>
    </>
  )
}

export default Layout;