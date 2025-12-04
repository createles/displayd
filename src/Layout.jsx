import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    </>
  )
}

export default Layout;