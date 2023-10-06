import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

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
  };

  return (
    <section>
      <div>
        <div className="contact-container">
          <h1>Contact details</h1>
          <p>E-mail: www.example.com</p>
          <p>Tel:+407xxxxxxxx</p>
          <p>Address: Str.Pantofului, Nr.Cartofului</p>
        </div>
        <div class="form-container">
          <h3>Message Us</h3>
          <form ref={form} onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" placeholder="Type your message..." />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.723297912627!2d25.994905076831998!3d44.928962271070276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b249a220af0053%3A0xdaa335f87fb32130!2sAleea%20Prislop%207%2C%20Ploie%C8%99ti%20107592!5e0!3m2!1sro!2sro!4v1696600372815!5m2!1sro!2sro"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            border: "1px solid black",
          }}
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
