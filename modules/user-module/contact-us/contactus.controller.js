import ContactUs from '../contact-us/contactus.model.js'

const createContactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create a new contact us entry
    const contactEntry = new ContactUs({
      name,
      email,
      subject,
      message
    });

    // Save to the database
    await contactEntry.save();

    res.status(201).json({ message: "Message submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit message.", error: error.message });
  }
};

const getAllContactUs = async (req, res) => {
    try {
      // Retrieve all Contact Us entries from the database
      const contactEntries = await ContactUs.find();
  
      // Check if no entries are found
      if (contactEntries.length === 0) {
        return res.status(404).json({ message: "No contact entries found." });
      }
  
      // Send the retrieved entries in the response
      res.status(200).json(contactEntries);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve contact entries.", error: error.message });
    }
  };

export default { createContactUs,getAllContactUs };
