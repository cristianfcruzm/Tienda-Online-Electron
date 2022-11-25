const boom = require('@hapi/boom');
const userService = require('./users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('.././config/config');
const nodemailer = require('nodemailer');

const service = new userService();

class authService {
  constructor() {}
  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://localhost:3001/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: `"Recovery Password 📧" <${config.emailSender}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar contraseña 📧✔', // Subject line
      html: `<b>ingresa a este link => ${link}</b>`, // html body
    };
    const rta = await this.sendEmail(mail);

    return rta;
  }

  async sendEmail(infoEmail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.emailSender,
        pass: config.passwordSender,
      },
    });
    await transporter.sendMail(infoEmail);
    return { message: 'mail sended' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash});
      return { message: 'password changed'};
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = authService;
