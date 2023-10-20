import { Route, Routes } from "react-router";
import Content from "../../components/content/Content";
import styles from "./Admin.module.scss";
import HomeAdmin from "./home/HomeAdmin";
import AddProducts from "./addProducts/AddProducts";
import ViewOrders from "./viewOrders/ViewOrders";
import ViewProducts from "./viewProducts/ViewProducts";

const Admin = () => {
  return (
    <Content>
        <div className={styles.admin}>Admin</div>

      <Routes>
        <Route path="/home" element={<HomeAdmin />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route path="/view-orders" element={<ViewOrders />} />
        <Route path="/view-products" element={<ViewProducts />} />
      </Routes>
    </Content>
  );
};

export default Admin;
