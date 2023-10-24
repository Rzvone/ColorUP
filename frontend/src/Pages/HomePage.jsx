import { useSelector } from "react-redux";
import AdminRequests from "../Components/AdminRequests";
import Visitor from "../Components/Visitor";
import state from "../state";
import SimpleFooter from "../Components/SimpleFooter";
import Stylists from "../Components/Stylists";
const HomePage = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user !== null && user.role === "ROLE_ADMIN" ? (
        <div>
        <AdminRequests />
        <SimpleFooter/>
        </div>
      ) : (
        <div>
          <Visitor />
          <Stylists/>
          <SimpleFooter />
        </div>
      )}
    </>
  );
};

export default HomePage;
