const valid = async (req, res, next, Schema) => {
  try {
    const value = await Schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default valid;
