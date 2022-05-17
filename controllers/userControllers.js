import { db } from "../config";
const models = db.connection.models;
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import generator from "generate-password";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
const __basedir = path.resolve();
require("dotenv").config();
let email = process.env.email;
let pw = process.env.PASS;
var secret = process.env.SECRET;
import { infoLogger, errorLogger } from "../logger";
import { upload } from "../middleware";
import AWS from "aws-sdk";
let ID = process.env.AWS_ID;
var AK = process.env.AWS_AK;
const awsBase = async (req, res) => {
  try {
    const filename = fs.readFileSync(
      __basedir + "/imageStore/" + req.file.filename
    );
    console.log("filename", filename);
    const params = {
      Bucket: "jenilsatani",
      Key: `${Date.now() + path.extname(req.file.filename)}`,
      Body: filename,
      ACL: "public-read",
    };
    const s3 = new AWS.S3({
      accessKeyId: ID,
      secretAccessKey: AK,
    });
    s3.upload(params, (error, data) => {
      res.status(200).send({ success: true, message: "aws add" });
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const findData = async (req, res) => {
  try {
    infoLogger.info(req.params);
    const user = await models.User.findAll({ where: { id: req.params.id } });
    if (!user) throw new Error("id is not found");
    res.json({
      success: true,
      message: "get details Successfully",
      user,
    });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

const registerApi = async (req, res) => {
  try {
    var password = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log("password", password);
    infoLogger.info(req.body);
    let createData = await models.User.create({ ...req.body, password });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: pw,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: email,
      to: req.body.email,
      subject: "password verification mail",
      html: `<p>use this password for signup"<br/>  ${password} </p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.render("contact", { msg: "Email has been sent" });
    });
    res.send({ success: true, message: "register is done", createData });
  } catch (err) {
    errorLogger.error(err.message);
    console.log("err form registerApi", err);
    res.json({ success: false, message: err.message });
  }
};

const loginApi = async (req, res) => {
  try {
    infoLogger.info(req.body);
    const login = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (!login) {
      return res.json({
        success: false,
        message: "user is not found",
      });
    } else
      var token = jwt.sign({ email: login.email }, secret, {
        expiresIn: "1h",
      });
    res
      .status(200)
      .json({ success: true, message: "token is generate", token: token });
  } catch (error) {
    errorLogger.error(err.message);
    console.log("error", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const csvController = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload  file!");
    }
    const readableStream = __basedir + "/imageStore/" + req.file.filename;
    let Tutorial = [];
    fs.createReadStream(readableStream)
      .pipe(csv())
      .on("error", (error) => {
        console.log(error);
      })
      .on("data", (row) => {
        Tutorial.push(row);
      })
      .on("end", () => {
        console.log(Tutorial, "my side");
        models.Employee.bulkCreate(Tutorial);
      });
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const imageUpload = async (req, res) => {
  upload(req, res, async function (err, data) {
    try {
      console.log("err", err);
      console.log("data", data);
      let user = await models.User.create({
        ...req.body,
        Image: req.file.filename,
      });
      res.status(200).json({ success: true, message: "file is upload ", user });
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Enter a Right details" });
    }
  });
};

const updateData = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log("req.body", req.body);
    const data = await models.User.update(
      {
        username,
        email,
        phone,
        password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log("data", data);
    if (!data) throw new Error("id is not found");
    res.json({ success: true, message: "todo data is update", data });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

const deleteData = async (req, res) => {
  try {
    infoLogger.info(req.query);
    const id = req.query.id;
    if (!id) throw new Error("please pass id");
    const data = await models.User.destroy({
      where: {
        id: req.query.id,
      },
    });
    if (!data) throw new Error("please pass id");
    res
      .status(200)
      .json({ success: true, message: "id delete id success", data });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const combineData = async (req, res) => {
  const id = req.body.id;
  try {
    infoLogger.info(id, req.body);
    const { username, email, phone, password } = req.body;
    if (id) {
      const data = await models.User.update(
        {
          username,
          email,
          password,
          phone,
        },
        {
          where: { id: id },
        }
      );
      res.json({ success: true, message: "user data is update", data });
    } else {
      let createData = await models.User.create(req.body);
      res.send({ success: true, message: "register is done", createData });
    }
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

const twoData = async (req, res) => {
  try {
    infoLogger.info(req.query);
    let data = {};
    if (req.query.username) {
      data = { ...data, username: req.query.username };
    }
    if (req.query.email) {
      data = { ...data, email: req.query.email };
    }
    if (req.query.phone) {
      data = { ...data, mobilenumber: req.query.mobilenumber };
    }
    if (req.query.password) {
      data = { ...data, password: req.query.password };
    }
    console.log("data", data);
    const all = await models.User.findAll({ where: data });
    res.json({ success: true, message: "data is get", all });
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default {
  awsBase,
  findData,
  registerApi,
  loginApi,
  csvController,
  imageUpload,
  updateData,
  deleteData,
  combineData,
  twoData,
};
