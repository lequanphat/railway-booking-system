const CARRIAGE_RULES = {
  createCarriage: {
    name: [
      { required: true, message: 'Please enter the carriage name!' },
      { min: 10, message: 'Name must be at least 10 characters!' },
      {
        max: 150,
        message: 'Name must be at most 150 characters!',
      },
    ],
    floors: [{ required: true, message: 'Please select the number of floors!' }],
  },
};
export default CARRIAGE_RULES;
