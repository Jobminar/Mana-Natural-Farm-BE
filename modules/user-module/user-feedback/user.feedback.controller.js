import Feedback from '../user-feedback/user.feedback.model.js';

const createFeedback = async (req, res) => {
  try {
    const { userId, name, title, rating, description } = req.body;

    // Validate required fields
    if (!userId || !name || !title || rating === undefined || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({
      userId,
      name,
      title,
      rating,
      description,
    });

    // Save the feedback to the database
    await newFeedback.save();

    res.status(201).json({ message: "Feedback created successfully.", feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", err: error.message });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    // Fetch all feedback entries
    const feedback = await Feedback.find();

    if (!feedback.length) {
      return res.status(404).json({ message: "No feedback found." });
    }

    res.status(200).json({ message: "Feedback retrieved successfully.", feedback });
  } catch (error) {
    res.status(500).json({ message: "Failed to get feedback", error: error.message });
  }
};
const deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the feedback by ID and remove it
      const feedback = await Feedback.findByIdAndDelete(id);
  
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found." });
      }
  
      res.status(200).json({ message: "Feedback deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete feedback", error: error.message });
    }
  };

  const getFeedbackByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find feedbacks by userId
      const feedbacks = await Feedback.find({ userId });
  
      if (feedbacks.length === 0) {
        return res.status(404).json({ message: "No feedback found for this user." });
      }
  
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: "Failed to get feedback by userId", error: error.message });
    }
  };
  
  

export default { createFeedback, getAllFeedback,deleteFeedback,getFeedbackByUserId };
