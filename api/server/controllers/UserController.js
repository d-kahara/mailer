/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
/* eslint-disable no-else-return */
import UserService from '../services/UserService';
import Util from '../utils/Utils';
import data from '../utils/googleSheetParser';
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

  static async uploadSheetData(req, res) {
    try {
      Object.keys(data).forEach((key) => {
        const checkRecommendation = () => {
          if (data[key]['First recommendation'] === 'Yes' || data[key]['final recommendation'] === 'Yes') {
            return true;
          } else {
            return false;
          }
        };
        const firstName = data[key].Student.split(',')[0];
        const lastName = data[key].Student.split(',')[1];
        const email = data[key].Email;
        const ip1 = parseInt(data[key]['IP1 /31']);
        const ip2 = parseInt(data[key]['IP2 /22']);
        const ip3 = parseInt(data[key][' IP3 /22']);
        const ip4 = parseInt(data[key]['IP4 /28']);
        const attendance = parseFloat(data[key].Attendance) * 100;
        const reason1 = data[key]['reason (first recommendation)'];
        const reason2 = data[key]['reason (final recommendation)'];
        const recom1 = checkRecommendation();
        const recom2 = checkRecommendation();
        const newUSer = {
          email,
          firstName,
          lastName,
          attendance,
          ip1,
          ip2,
          ip3,
          ip4,
          recom1,
          recom2,
          reason1,
          reason2
        };
        async function addUser() {
          const createdUser = await UserService.addUser(newUSer);
          util.setSuccess(201, 'User Added!', createdUser);
        }
        addUser();
      });
      util.setSuccess(201, 'User data uploaded!');
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async sendEmail(req, res) {
    try {
      const users = await UserService.getAllUsers();
      Object.keys(users).forEach((key) => {
        if (users[key].recom1 === true && users[key].recom2 === true) {
          const mailOptions = {
            from: process.env.EMAIL,
            to: users[key].email,
            subject: 'Progress report',
            template: 'onTrack',
            context: {
              firstName: users[key].firstName,
              attendance: users[key].attendance,
              ip1: users[key].ip1,
              ip2: users[key].ip2,
              ip3: users[key].ip3,
              ip4: users[key].ip4,
            }
          };
          transporter.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log('accepted-ontrack', response.accepted);
            transporter.close();
          });
        } else {
          const mailOptions = {
            from: process.env.EMAIL,
            to: users[key].email,
            subject: 'Progress report',
            template: 'offTrack',
            context: {
              firstName: users[key].firstName,
              attendance: users[key].attendance,
              ip1: users[key].ip1,
              ip2: users[key].ip2,
              ip3: users[key].ip3,
              ip4: users[key].ip4,
              recom1: users[key].reason1,
              recom2: users[key].reason2
            }
          };
          transporter.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log('accepted-offtrack:', response.accepted);
            transporter.close();
          });
        }
      });
      util.setSuccess(200, 'Emails successfully sent');
      return util.send(res);
    } catch (error) {
      console.log(error);
      return util.send(res);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      if (allUsers.length > 0) {
        const emailList = [];
        Object.keys(allUsers).forEach((key) => {
          emailList.push(allUsers[key].email);
        });
        util.setSuccess(200, 'Users retrieved', allUsers);
      } else {
        util.setSuccess(200, 'No users found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default Usercontroller;
