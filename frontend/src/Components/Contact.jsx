import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
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
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default Contact;
