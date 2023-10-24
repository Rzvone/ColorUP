import { useSelector } from "react-redux";
import AdminRequests from "../Components/AdminRequests";
import Visitor from "../Components/Visitor";
import state from "../state";
import SimpleFooter from "../Components/SimpleFooter";
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
          <SimpleFooter />
        </div>
      )}
    </>
  );
};

export default HomePage;
