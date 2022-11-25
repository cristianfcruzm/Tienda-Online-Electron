const jwt = require('jsonwebtoken');

const secret = 'Julian';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2OTA4MDI3OH0.kpBIOxP3GbLX0yhcog_nIoMy5du8LwBEm3eOWpuB_cA';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
