import Users from "../models/userSchema.js";
import axios from "axios";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
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
        message: "your e mail has been breatched put analysis view detailed analysis in our platform",
      });
    }
  } else {
    res.json({ msg: "invalid email" });
  }
}

async function getBreachAnalysis(req, res) {
  const mail = req.param.email;
  const response = await axios.get(
    `https://api.xposedornot.com/v1/breach-analytics?email=${mail}`
  );
  if (response) {
    res.json(response);
  } else {
    res.json({ msg: "didnt get data" });
  }
}

function keccakHash(password) {
  const hash = crypto.createHash('sha3-512'); 
  hash.update(password, 'utf8');
  return hash.digest('hex').substring(0, 10); 
}

async function checkPassword(req,res) {
  const password=req.params.password
  if (password) {
    const pwdHash = keccakHash(password);
    const encodedPwdHash = encodeURIComponent(pwdHash); // URI encode the hash
    const url = `https://passwords.xposedornot.com/api/v1/pass/anon/${encodedPwdHash}`;

    try {
      const response = await axios.get(url); 

      if (response.status === 200) {
        res.json(response.data);
      } else if (response.status === 404) {
        console.log('Password is safe');
        res.json({"success":false});
      } else {
        console.error(`Error: ${response.status}`);
        res.json({"success":false});
      }
    } catch (error) {
      console.error(`Request failed: ${error.message}`);
      res.json({"success":false});

    }
  } else {
    console.log('Oops! Try again with a valid password.');
    res.json({"success":"false"});
  }
}



export { checkBreach, pushUser, getBreachAnalysis,checkPassword };
