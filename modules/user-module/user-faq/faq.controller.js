import FAQ from '../user-faq/faq.model.js'

// Create a new FAQ
 const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Validate input
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required." });
    }

    // Create and save FAQ
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();

    res.status(201).json({ message: "FAQ created successfully", faq: newFAQ });
  } catch (error) {
    res.status(500).json({ message: "Failed to create FAQ", error: error.message });
  }
};

// Get all FAQs
 const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find(); // Fetch only visible FAQs
    if (faqs.length === 0) {
      return res.status(404).json({ message: "No FAQs found." });
    }
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQs", error: error.message });
  }
};

// Delete an FAQ by ID
 const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found." });
    }

    res.status(200).json({ message: "FAQ deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete FAQ", error: error.message });
  }
};



export default {createFAQ,getFAQs,deleteFAQ}