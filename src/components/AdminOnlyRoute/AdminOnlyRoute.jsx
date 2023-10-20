import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slices/authSlice";


const AdminOnlyRoute = ({ children }) => {
  const email = useSelector(selectEmail);

  if (email == "kot@gmail.com") {
    return <div>{children}</div>;
  }
  else {
    return null
  }
};

export default AdminOnlyRoute;
