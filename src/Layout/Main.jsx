import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

export default function Main() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}
