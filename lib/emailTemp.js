// an email template that can be used with Nodemailer to send emails

const HTML_TEMPLATE = (name) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>CONFIRMATION OF REGISTRATION</h1>
              </div>
              <div class="email-body">
              <h3>Hi! ${name}</h3>
                <p>Congratulations You have been succefully registered on our platform</p> 
              <p>You are in to enjoy reliable information from us regarding your Post UTME</p>
              <p>This is a follow up to further give you assurance of our availability and ensure that all promises we made are fully kept</p>
              <p>Do not hesitate to get back to us should you have a further enqiury</p>

               <br />

              <h5>Contact at </h5>
              <p>Whatsapp: 08038724054</p>
              <p>Email: brand@gmail.com</p>
             

              </div>
              <div class="email-footer">
                <p>Cheers!!</p>
              <p>Brand Name Team</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};

export default HTML_TEMPLATE;
