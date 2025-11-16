// src/models/User.js

const User = {
  id: 'number',
  name: 'string',
  email: 'string', 
  password: 'string',
  role: 'string', // 'client' or 'chef'
  created_at: 'timestamp'
};

export default User;