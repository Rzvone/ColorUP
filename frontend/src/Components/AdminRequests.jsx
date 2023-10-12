import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DefaultAvatar from "./DefaultAvatar";

const AdminRequests = () => {
  const token = useSelector((state) => state.token);
  const userLoggedIn = useSelector((state) => ({
    user: state.user,
    token: state.token,
  }));
  const [providedUsers, setProvidedUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "http://localhost:8080/api/admin/getPendingProviders",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      console.log(res);
      setProvidedUsers(res);
    };
    fetchUsers();
  }, []);

  const handleAcceptClick = async (user, services) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/makeprovider`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userLoggedIn.token}`,
          },
          body: JSON.stringify({ user: user, services: services }),
        }
      );
      if (response.ok) {
        alert("Account details updated successfully!");
      } else {
        console.error("Failed to update details:", response.statusText);
      }
    } catch (error) {
        console.error("An error occurred:", error);
    }
  };

  const handleDeclineClick = () => {};

  return (
    <Grid container spacing={4} sx={{ marginTop: "2rem", textAlign: "center" }}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="primary">
          Hello,
        </Typography>
        <Typography variant="h4" color="secondary">
          {userLoggedIn.user.firstName}
        </Typography>
      </Grid>
      {providedUsers.map((user, i) => (
        <Grid item xs={12} md={5} key={i} sx={{ margin: "auto" }}>
          <Card sx={{ padding: ".5rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <DefaultAvatar
                firstName={user.firstName}
                lastName={user.lastName}
              />
            </Box>
            <Typography sx={{ margin: ".5rem" }}>
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography sx={{ margin: ".5rem" }}>
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography sx={{ margin: ".5rem" }}>
              <strong>Email Address:</strong> {user.email}
            </Typography>
            <Typography sx={{ margin: ".5rem" }}>
              <strong>Contact Number:</strong> {user.contactNumber}
            </Typography>
            <Button
              variant="contained"
              sx={{ margin: "1rem" }}
              onClick={handleAcceptClick(user,)}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "1rem" }}
              onClick={handleDeclineClick}
            >
              Decline
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminRequests;
