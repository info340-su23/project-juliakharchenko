import React from 'react';

const handleLegalFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const nameInput = form.querySelector("#name");
    const contactInput = form.querySelector("#contact-info");
    const ageInput = form.querySelector("#age");
    const ethnicityInput = form.querySelector('#ethnicity');
    const sexInput = form.querySelector('#sex');
    const legalInput = form.querySelector('#legal-services');
    const specialInput = form.querySelector('#special-requests');

    if (nameInput.value.trim() === "") {
        alert("Please fill out your name.")
    } else if ((!contactInput.value.includes('@'))) {
        alert("Please fill out a valid email address or phone number: email addresses must contain this symbol: @");
    } else if (ageInput.value.trim() === "" || contactInput.value.match(/^[0-9]+$/) !== null) {
        alert("Please enter a valid age (integer number).");
    } else if (legalInput.value.trim() === "") {
        alert("Please enter what legal services you are requesting.");
    } else {
      alert("Form submitted successfully!");
      form.reset();
    }
};

const LegalAssistancePage = () => {
  return (
    <main>
      <h2>Legal Assistance</h2>
      <p>If you need legal assistance, please fill out the form below and we will get back to you as soon as possible:</p>
      <form id="legal-form" action="submit_form.php" method="POST" onSubmit={handleLegalFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="contact-info">Email:</label>
        <input type="text" id="contact-info" name="contact-info" required />

        <label htmlFor="age">Age:</label>
        <input type="text" id="age" name="age" required />

        <label htmlFor="ethnicity">Ethnicity:</label>
        <input type="text" id="ethnicity" name="ethnicity" required />

        <label htmlFor="sex">Sex:</label>
        <select id="sex" name="sex" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="legal-services">Legal Services Needed:</label>
        <textarea id="legal-services" name="legal-services" rows="4" required></textarea>

        <label htmlFor="special-requests">Special Requests:</label>
        <textarea id="special-requests" name="special-requests" rows="4"></textarea>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default LegalAssistancePage;
