import config from '#config'

import Mailchimp from "mailchimp-api-v3";
import * as yup from "yup";
import { useBody } from 'h3'

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const mailchimp = new Mailchimp(config.NUXT_APP_MAILCHIMP_API_KEY);

const isValidMail = async (email) => {
  try {
    return await schema.isValid({
      email,
    });
  } catch (err) {
    return false;
  }
};

const addMail = async (email) => {
  let result = {
    type: "success",
    message: "Email added to mailing list",
  };

  try {
    await mailchimp.post("/lists/4d134ba5d6/members", {
      email_address: email,
      status: "subscribed",
    });
  } catch (error) {
    if (error.title === "Member Exists") {
      result = {
        type: "success",
        message: "Email already in mailing list",
      };
    } else {
      result = {
        type: "error",
        message: "Error emailing api",
      };
    }
  }

  return result;
};

export default async (req, res) => {
  let result = {
    type: "error",
    message: "error",
  };

  const {email}  = await useBody(req)
  
  if (await isValidMail(email)) {
    const res = await addMail(email);

    result = { ...res };
  } else {
    const message = "Invalid email";
    result = { ...result, message };
  }

  return result;
}