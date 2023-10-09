import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

export const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //ADD  your correct email address
    //Use the EmailJS website (www.emailjs.com)
    // 1. Make an account free(up to 200 monthly free messages on e-mail)
    // 2. Create your service
    // 3. Create your template
    // 4. Link to all the steps ( https://www.youtube.com/watch?v=bMq2riFCF90&ab_channel=ChaooCharles )

    emailjs
      .sendForm(
        "service_ljfxm47", //"YOUR_SERVICE_KEY"
        "template_xapft3a", //"YOUR_TEMPLATE_ID"
        form.current,
        "du7lKD3UhqFbFad05" //YOUR_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent");
        },
        (error) => {
          console.log(error.text);
        }
    );
    alert("Your message has been sent. ")
  };

 return (
   <div
     className="container"
     style={{
       display: "grid",
       gridTemplateColumns: "1fr 1fr",
       gap: "20px",
       marginTop: "5rem",
     }}
   >
     <div style={{ padding: "1rem" }}>
       <div>
         <Typography gutterBottom variant="h4" align="left" color="primary">
           Our contact details
         </Typography>
         <Typography gutterBottom variant="h6" align="left">
           E-mail: colorup@gmail.com
         </Typography>
         <Typography gutterBottom variant="h6" align="left">
           Phone Number: +407xxxxxxx
         </Typography>
         <Typography gutterBottom variant="h6" align="left">
           Address: Str.Cartofului, Nr.Pantofului
         </Typography>
       </div>

       <form ref={form} onSubmit={handleSubmit}>
         <Card style={{ maxWidth: 550, padding: "20px 2px" }}>
           <CardContent>
             <Typography gutterBottom variant="h5">
               Contact us
             </Typography>
             <Typography gutterBottom color = "textSecondary" variant="body2" component="p">
               Fill up the form and our team will get back to you within 24 hours.
             </Typography>

             <Grid>
               <Grid xs={12} sm={6} item>
                 <TextField
                   style={{ marginBottom: "1rem" }}
                   label="Name"
                   name="user_name"
                   placeholder="Enter your name"
                   variant="outlined"
                   fullWidth
                   required
                 ></TextField>
               </Grid>
               <Grid xs={12} item>
                 <TextField
                   style={{ marginBottom: "1rem" }}
                   label="Email"
                   name="user_email"
                   placeholder="Enter your e-mail address"
                   variant="outlined"
                   fullWidth
                   required
                 ></TextField>
               </Grid>
               <Grid xs={12} item>
                 <TextField
                   style={{ marginBottom: "2rem" }}
                   label="Message"
                   name="message"
                   placeholder="Type your message here"
                   variant="outlined"
                   fullWidth
                   required
                 ></TextField>
               </Grid>
               <Grid xs={12} item>
                 <Button
                   type="submit"
                   multiline-rows={4}
                   variant="contained"
                   color="primary"
                   fullWidth
                   //  onClick={(e)=>handleSubmit(e)}
                 >
                   Submit
                 </Button>
               </Grid>
             </Grid>
           </CardContent>
         </Card>
       </form>
     </div>
     <iframe
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.723297912627!2d25.994905076831998!3d44.928962271070276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b249a220af0053%3A0xdaa335f87fb32130!2sAleea%20Prislop%207%2C%20Ploie%C8%99ti%20107592!5e0!3m2!1sro!2sro!4v1696600372815!5m2!1sro!2sro"
       style={{
         border: "1px solid black",
         padding: "1rem",
         marginTop: "3rem",
       }}
       width="600"
       height="450"
       allowFullScreen=""
       loading="lazy"
       referrerPolicy="no-referrer-when-downgrade"
     ></iframe>
   </div>
 );


};

export default Contact;
