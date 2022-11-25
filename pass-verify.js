const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin123.202';
  const hash = '$2b$10$t565FEjTYX5sXLMrbWoQye/vca0cUHa43p.gQjN7wK43xt5NeroVm'
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}


verifyPassword()
