import { useSelector } from "react-redux";
import AdminRequests from "../Components/AdminRequests";
import Visitor from "../Components/Visitor";
import state from "../state";
import SimpleFooter from "../Components/SimpleFooter";
import Stylists from "../Components/Stylists";
import Products from "../Components/Products"
import { Typography } from "@mui/material";
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
          <Typography variant="h3" color="primary" sx={{textAlign:'center'}}>Choose your favourite products</Typography>
          <Products/>
          <SimpleFooter />
        </div>
      )}
    </>
  );
};

export default HomePage;
