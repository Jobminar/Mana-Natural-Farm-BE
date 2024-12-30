import Address from './user.address.model.js'

// Create a new address
const createAddress = async (req, res) => {
  try {
    const {userId, firstName, lastName, address, landMark, country, state, pincode, email, phone, orderNotes } = req.body;

    // Validate required fields
    if (!userId || !firstName || !lastName || !address || !landMark || !country || !state || !pincode || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create and save a new address
    const newAddress = new Address({
      userId,
      firstName,
      lastName,
      address,
      landMark,
      country,
      state,
      pincode,
      email,
      phone,
      orderNotes
    });

    await newAddress.save();
    res.status(201).json({ message: 'Address successfully created', address: newAddress });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', err: error.message });
  }
};

// Get an address by ID
const getAddressById = async (req, res) => {
  try {
    const { userId } = req.params;

    const address = await Address.find({userId});
    if (!address) {
      return res.status(404).json({ message: 'Address not found in this user' });
    }

    res.status(200).json(address);
  } catch (error) {  
    res.status(500).json({ error: 'Failed to retrieve address', err: error.message });
  }
};

// Update an address by ID
const updateAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId, firstName, lastName, address, landMark, country, state, pincode, email, phone, orderNotes } = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(id,
      {userId, firstName, lastName, address, landMark, country, state, pincode, email, phone, orderNotes },
      { new: true } 
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address', err: error.message });
  }
};

// Delete an address by ID
const deleteAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete address', err: error.message });
  }
};

// Get all addresses (optional, if needed)
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    if (addresses.length === 0) {
      return res.status(404).json({ message: 'No addresses found' });
    }

    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve addresses', err: error.message });
  }
};

export default {createAddress,getAllAddresses,getAddressById,deleteAddressById,updateAddressById}