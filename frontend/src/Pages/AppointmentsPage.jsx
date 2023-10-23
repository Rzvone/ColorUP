import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import DefaultAvatar from "../Components/DefaultAvatar";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const AppointmentsPage = () => {
  const user = useSelector((state) => state.user);
  const [providers, setProviders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProviders = async () => {
      const uniqueProviderIds = new Set(
        user.appointments.map((appointment) => appointment.provider)
      );
      const params = [...uniqueProviderIds]
        .map((providerId) => `providerIds=${providerId}`)
        .join("&");
      const response = await fetch(
        `http://localhost:8080/api/providers/getProvidersPerAppointment?${params}`
      );
      const res = await response.json();
      setProviders(res);
    };
    fetchProviders();
  }, [user.appointments]);

  console.log(providers);
  console.log(user.appointments);
  const fetchUserData = () => {
    fetch(`http://localhost:8080/users/getUser/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(
          setLogin({
            user: { ...data.user, image: data.image },
            token: user.token,
          })
        );
      });
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/appointment/deleteAppointment/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        // Perform actions if the deletion is successful
        console.log("Appointment deleted successfully.");
        fetchUserData();
        alert("Appointment deleted successfully!");
      } else {
        // Handle errors if the response is not OK
        console.error("Failed to delete the appointment.");
      }
    } catch (error) {
      // Handle any network errors or other exceptions
      console.error("An error occurred while deleting the appointment:", error);
    }
  };

  return (
    <Box sx={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
      <Grid container spacing={2}>
        {user.appointments.map((appointment, i) => {
          const matchingProvider = providers.find(
            (provider) => appointment.provider === provider.id
          );

          return (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ minWidth: 275, minHeight: 200 }}>
                <CardContent>
                  <Typography variant="h5">
                    {dayjs(appointment.startDate).format("DD/MM/YY HH:mm")} -{" "}
                    {dayjs(appointment.endDate).format("HH:mm")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {matchingProvider && matchingProvider.image !== null ? (
                        <Avatar src={matchingProvider.image}></Avatar>
                      ) : (
                        <DefaultAvatar
                          firstName={
                            matchingProvider ? matchingProvider.firstName : ""
                          }
                          lastName={
                            matchingProvider ? matchingProvider.lastName : ""
                          }
                        />
                      )}
                      <Typography variant="h5" sx={{ marginLeft: 2 }}>
                        {matchingProvider ? matchingProvider.firstName : null}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <Typography
                        variant="button"
                        color={
                          appointment.status === "ACCEPTED" ? "green" : "orange"
                        }
                        sx={{ marginTop: 1 }}
                      >
                        <strong>{appointment.status}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {appointment.services
                          .map((service) => service.serviceType)
                          .join(",")}
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {appointment.services.reduce(
                          (acc, cur) => (acc += cur.price),
                          0
                        )}{" "}
                        $
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  {appointment.status === "PENDING" ? (
                    <Button
                      size="small"
                      onClick={() => deleteAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Typography>
                      Your appointment is currently{" "}
                      {appointment.status.toLowerCase()}, if you're willing to
                      cancel it, please contact the provider
                    </Typography>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AppointmentsPage;
