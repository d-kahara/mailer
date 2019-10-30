import UserService from '../services/UserService';
import Util from '../utils/Utils';
import { transporter } from '../utils/MailConfig';


const util = new Util();

class Usercontroller {
  static async addUser(req, res) {
    if (!req.body.email) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newUSer = req.body;
    try {
      const createdUser = await UserService.addUser(newUSer);
      util.setSuccess(201, 'User Added!', createdUser);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async sendEmail(req, res) {
    try {
      const mailOptions = {
        from: 'bevstop@gmail.com',
        to: 'kaharadave@gmail.com',
        subject: 'Moringa school Progress report',
        text: 'ontrack.html',
        template: 'onTrack'
      };
      transporter.sendMail(mailOptions, (error, response) => {
        // eslint-disable-next-line no-unused-expressions
        error ? console.log(error) : console.log(response);
        transporter.close();
      });
      util.setSuccess(200, 'yaay')
      return util.send(res);
    } catch (error) {
      console.log(error);
      return util.send(res);
    }
  }
}

export default Usercontroller;
