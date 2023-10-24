import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Rating,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useTheme } from "@mui/material/styles";
import { FormControl } from "@mui/base";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StylistPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [stylist, setStylist] = useState({});
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState([]);
  const [servicesId, setServicesId] = useState([]);
  const [date, setDate] = useState(null);

  const user = useSelector((state) => state.user);
  // const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStylist = async () => {
      const response = await fetch(
        `http://localhost:8080/api/providers/getProvider/${id}`
      );
      const res = await response.json();
      console.log(res);
      setStylist(res);
      setLoading(false);
    };
    fetchStylist();
  }, [id]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const isBooked = (date) => {
    // Convert the selected date to a dayjs object
    // Iterate through the appointments to check if the date is booked
    for (const appointment of stylist.provider.providerAppointments) {
      const startDate = dayjs(appointment.startDate);
      const endDate = dayjs(appointment.endDate);

      // If the selected date is between the start and end of an appointment, it's booked
      if (date.isBetween(startDate, endDate)) {
        return true;
      }
    }

    // If no booked date is found, return false to enable the date
    return false;
  };

  useEffect(() => {
    setServicesId(
      stylist?.provider?.servicesProvided
        ?.map((s) => (service.includes(s.serviceType) ? s.id : null))
        .filter((s) => s != null)
    );
  }, [service, stylist]);

  const handleSubmit = async () => {
   const response =  await fetch(`http://localhost:8080/appointment/postAppointment/${user.id}`, {
      method: "POST",
      body: JSON.stringify({
        serviceIds: servicesId,
        providerId: id,
        start: date,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json()
    console.log(res)
    alert("Appointment created successfully!")
    navigate('/appointments')
  };

  const pleaseLogIn = () => {
    alert("Please log into your account to make an appointment.");
    navigate("/authentication");
  }

  function getStyles(name, service, theme) {
    return {
      fontWeight:
        service.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <Box
      sx={{
        "@media (min-width: 1025px)": {
          // Media query for screens wider than 768px (medium and above)
          marginLeft: 30,
          marginRight: 30,
          marginTop: 10,
        },
      }}
    >
      {!loading && (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <Box>
              <Avatar
                alt="profile picture"
                src={stylist.image}
                sx={{
                  width: "100%", // Default styling for smaller screens
                  height: "auto", // Default styling for smaller screens
                  "@media (min-width: 850px)": {
                    // Media query for screens wider than 850px (for example, large screens)
                    width: 300, // Styling for larger screens
                    height: 300, // Styling for larger screens
                  },
                }}
              ></Avatar>
              <Typography sx={{ marginTop: 1 }}>
                Services provided:
                {stylist.provider.servicesProvided
                  .map((service) => service.serviceType)
                  .join(",")}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography>Rating:</Typography>
                <Rating readOnly></Rating>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                {stylist.provider.firstName} {stylist.provider.lastName}
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <InputLabel id="demo-multiple-service-label">
                  Select service:
                </InputLabel>
                <Select
                  labelId="demo-multiple-service-label"
                  id="demo-multiple-service"
                  multiple
                  fullWidth
                  value={service}
                  onChange={handleChange}
                  input={<OutlinedInput label="Select Service: " />}
                  MenuProps={MenuProps}
                >
                  {stylist.provider.servicesProvided
                    .map((service) => service.serviceType)
                    .map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, service, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <InputLabel id="select-date">Select Date:</InputLabel>
                <DateTimePicker
                  sx={{ width: "100%" }}
                  onChange={(newValue) =>
                    setDate(dayjs(newValue).format("YYYY-MM-DD HH:mm"))
                  }
                  disablePast
                  shouldDisableTime={(value, view) => {
                    if (view === "hours") {
                      const currentValue = dayjs(value);
                      if (currentValue.hour() < 9 || currentValue.hour() > 20) {
                        return true;
                      }
                      for (
                        let i = 0;
                        i < stylist.provider.providerAppointments.length;
                        i++
                      ) {
                        const { startDate, endDate } =
                          stylist.provider.providerAppointments[i];
                        const starttDate = dayjs(startDate);
                        const enddDate = dayjs(endDate);

                        if (
                          currentValue.isBetween(
                            starttDate,
                            enddDate,
                            null,
                            "[]"
                          )
                        ) {
                          return true;
                        }
                      }
                    }

                    return false;
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </Box>
              <Button variant="outlined" onClick={() => user === null ? pleaseLogIn() : handleSubmit()} sx={{marginTop:'1rem'}}>Make appointment</Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default StylistPage;
