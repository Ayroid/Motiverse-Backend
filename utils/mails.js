const templates = {
  REGISTRATION: {
    subject: "Motiverse - Registration Successful",
    html: `
    <html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #1e1e1e;
        margin: 0;
        padding: 0;
        font-size: 16px;
      }
      .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        padding-bottom: 2rem;
        background-color: #000;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1,
      h2,
      h3,
      span {
        color: #f50057;
      }
      div {
        line-height: 1.3;
        color: #ffffff;
      }
      .socials {
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
      svg {
        margin: 0 5px;
        height: 30px;
      }
      hr {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Motiverse!</h1>
      <h2>Registration Successful</h2>
      <div>
        Hi username,
        <br />
        <br />
        Get ready to ignite your social media presence with Motiverse! We're
        thrilled to have you join our community of creators.
        <br /><br />
        Contact our support team for help with reel creation or Instagram page
        design!

        <br /><br />

        Thanks, and Regards
        <br />
        <br />
        Team <span>Motiverse</span>
      </div>
    </div>
  </body>
</html>
    `,
  },

  LOGIN: {
    subject: "Motiverse - Login Successful",
    html: `
    <html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #1e1e1e;
        margin: 0;
        padding: 0;
        font-size: 16px;
      }
      .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        padding-bottom: 2rem;
        background-color: #000;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1,
      h2,
      h3,
      span {
        color: #f50057;
      }
      div {
        line-height: 1.3;
        color: #ffffff;
      }
      .socials {
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
      svg {
        margin: 0 5px;
        height: 30px;
      }
      hr {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
      }
    </style>

  </head>

  <body>
    <div class="container">
      <h1>Welcome Back to Motiverse!</h1>
      <h2>Login Successful</h2>
      <div>
        Hi username,
        <br />
        <br />
        You have successfully logged into your Motiverse account. We're excited
        to have you back!
        <br /><br />
        Contact our support team for help with reel creation or Instagram page
        design!

        <br /><br />

        Thanks, and Regards
        <br />
        <br />
        Team <span>Motiverse</span>
      </div>
    </div>

  </body>

</html>
    `,
  },
};

export { templates as MAILTEMPLATES };
