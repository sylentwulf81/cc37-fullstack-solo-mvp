// allows the user to send a contact / support email
// TODO add toast in successful submission

import React from "react";

const ContactForm: React.FC = () => {
  return (
    <>
      <form action="https://formsubmit.co/your@email.com" method="POST">
        <input type="text" name="name" required />
        <input
          type="text"
          name="email"
          required
          placeholder="Your Email Address"
        />
        <input type="email" name="email" required />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ContactForm;
