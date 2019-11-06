/**
 * Email Server based on NodeJS
 */

var nodemailer = require ('nodemailer');
	var transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: 'xxxxxxx@gmail.com',
		    pass: '*******'
		  }
		});

		var mailOptions = {
		  from: 'xxxxxxx@gmail.com',
		  to: 'yyyyyyy@hotmail.com',
		  subject: 'Sending Email using Node.js',
		  text: 'That was a crap!'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});