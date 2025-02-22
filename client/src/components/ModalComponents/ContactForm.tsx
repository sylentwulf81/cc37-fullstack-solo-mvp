// allows the user to send a contact / support email
// TODO add toast in successful submission
// TODO form doesn't "go" anywhere currently when submitted

import "./Modal.css";

export default function ContactForm() {
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
}
