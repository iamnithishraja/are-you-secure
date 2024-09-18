import Users from "../models/userSchema.js";
import axios from "axios";
import sendEmail from "../utils/sendEmail.js";
async function pushUser(req, res) {
  try {
    const userid = req.body.userId;
    const mail = req.body.email;
    const dbUser = await Users.findOne({ id: userid });
    if (!dbUser) {
      const user = await Users.create({ id: userid, email: mail });
      await user.save();
      return res.json({ success: true, msg: "New User registered" });
    } else {
      return res.json({ msg: "already registerd" });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, msg: "Unable to parse the body parameters." });
  }
}

async function checkBreach(req, res) {
  const mail = req.param.email;
  const response = axios.get(
    `https://api.xposedornot.com/v1/check-email/${mail}`
  );
  if (response) {
    if (response.error) {
      res.json({ isBreached: false });
    } else {
      res.json({ isbreached: true });
      sendEmail({
        email: mail,
        subject: "Alert your password is leacked",
        message:
          "your e mail has been breatched put analysis view detailed analysis in our platform",
      });
    }
  } else {
    res.json({ msg: "invalid email" });
  }
}

async function getBreachAnalysis(req, res) {
  const mail = req.params.email;

  const response = await axios.get(
    `https://api.xposedornot.com/v1/breach-analytics?email=${mail}`
  );
  res.json(response.data);
}
export { checkBreach, pushUser, getBreachAnalysis };
