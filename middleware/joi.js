import Joi from "joi";
import { validationSchema } from "../middleware";

const registrationSchema = async (req, res, next) => {
  const Schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    password: Joi.string().required(),
  });
  validationSchema(req, res, next, Schema);
};

const todoSchema = async (req, res, next) => {
  const Schema = Joi.object({
    Title: Joi.string().required(),
    content: Joi.string().required(),
    user_id: Joi.string().required(),
  });
  validationSchema(req, res, next, Schema);
};

const todoAddSchema = async (req, res, next) => {
  const Schema = Joi.object({
    Title: Joi.string().required(),
    content: Joi.string().required(),
  });
  validationSchema(req, res, next, Schema);
};

const updateSchema = async (req, res, next) => {
  const Schema = Joi.object({
    Title: Joi.string().required(),
    content: Joi.string().required(),
  });
  validationSchema(req, res, next, Schema);
};

const updateRegistrationSchema = async (req, res, next) => {
  const Schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(10).required(),
    phone: Joi.string().min(10).required(),
  });
  validationSchema(req, res, next, Schema);
};

const combineSchema = async (req, res, next) => {
  const Schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(10).required(),
    mobilenumber: Joi.string().max(10).required(),
  }).unknown(true);
  validationSchema(req, res, next, Schema);
};

const combineRegistrationSchema = async (req, res, next) => {
  const Schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(10).required(),
    mobilenumber: Joi.string().max(10).required(),
    id: Joi.string().required(),
  });
  validationSchema(req, res, next, Schema);
};

export default {
  registrationSchema,
  todoSchema,
  updateSchema,
  updateRegistrationSchema,
  combineSchema,
  combineRegistrationSchema,
  todoAddSchema,
};
