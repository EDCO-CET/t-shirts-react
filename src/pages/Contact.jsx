import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <>
      <div className='contact-container'>
        <header>
          <h1>Contact Us</h1>
        </header>
        <section>
          <ContactForm />
        </section>
      </div>
    </>
  );
}

export default Contact;
