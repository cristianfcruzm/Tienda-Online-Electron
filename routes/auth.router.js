const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const { recoverySchema, changeSchema} = require('../schemas/recovery.shema');
const authService = require('../services/auth.service');

const service = new authService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.status(200).json(service.singToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  validatorHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/change-password',
  validatorHandler(changeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token,newPassword);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
