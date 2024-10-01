const RULES = {
  login: {
    username: [
      { required: true, message: "Please enter a username!" },
      { min: 6, message: "Username must be at least 6 characters!" },
      {
        max: 50,
        message: "Username must be at most 50 characters!",
      },
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: "Username can only contain letters and numbers!",
      },
    ],
    password: [
      { required: true, message: "Please enter a password!" },
      { min: 6, message: "Password must be at least 6 characters!" },
      {
        max: 16,
        message: "Password must be at most 16 characters!",
      },
    ],
  },
  register: {
    name: [
      { required: true, message: "Please enter the employee name!" },
      { min: 3, message: "Name must be at least 3 characters!" },
      {
        max: 30,
        message: "Name must be at most 30 characters!",
      },
    ],
    username: [
      { required: true, message: "Please enter a username!" },
      { min: 6, message: "Username must be at least 6 characters!" },
      {
        max: 50,
        message: "Username must be at most 50 characters!",
      },
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: "Username can only contain letters and numbers!",
      },
    ],
    email: [
      { required: true, message: "Please enter your email!" },
      { type: "email", message: "Please enter a valid email!" },
    ],
    password: [
      { required: true, message: "Please enter a password!" },
      { min: 6, message: "Password must be at least 6 characters!" },
      {
        max: 16,
        message: "Password must be at most 16 characters!",
      },
    ],
  },
  createEmployee: {
    name: [
      { required: true, message: "Please enter the employee name!" },
      { min: 3, message: "Name must be at least 3 characters!" },
      {
        max: 30,
        message: "Name must be at most 30 characters!",
      },
    ],
    email: [
      { required: true, message: "Please enter your email!" },
      { type: "email", message: "Please enter a valid email!" },
    ],
    phone: [
      { required: true, message: "Please enter the phone number!" },
      { min: 9, message: "Phone number must be at least 9 characters!" },
      {
        max: 11,
        message: "Phone number must be at most 11 characters!",
      },
    ],
    address: [
      { required: true, message: "Please enter the employee address!" },
      { min: 8, message: "Address must be at least 8 characters!" },
      {
        max: 150,
        message: "Address must be at most 150 characters!",
      },
    ],
    password: [
      { required: true, message: "Please enter a password!" },
      { min: 6, message: "Password must be at least 6 characters!" },
      {
        max: 16,
        message: "Password must be at most 16 characters!",
      },
    ],
  },
};
export default RULES;
