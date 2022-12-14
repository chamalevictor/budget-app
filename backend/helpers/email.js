import nodemailer from "nodemailer";

export const singupEmail = async (data) => {
  const { email, name, token } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify email server connectivity.
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to receive messages.");
    }
  });

  await transporter.sendMail({
    from: '"Budget Manager - Administra tus Finanzas" <accounts@budgetmanager.com>',
    to: email,
    subject: "Budget Manager - Confirma Tu Cuenta",
    text: "Comprueba tu cuenta en Budget Manager",
    html: `<p> Hola ${name}. Comprueba tu cuenta en Budget Manager </p>
    <p> Tu cuenta está ya casi lista, sólo debes comprobarla en el siguiente enlace:

    <a href="${process.env.FRONTEND_URL}/confirm_account/${token}"> Comprobar Cuenta </a>

    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  });
};

export const forgotPasswordEmail = async (data) => {
  const { email, name, token } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del email

  await transporter.sendMail({
    from: '"Budget Manager - Administra tus Finanzas" <accounts@budgetmanager.com>',
    to: email,
    subject: "Budget Manager - Restablece Tu Contraseña",
    text: "Restablece Tu Contraseña",
    html: `<p> Hola ${name}. Has solicitado restablecer tu contraseña. </p>
    <p> Ingresa en el siguiente elnace para crear una nueva contraseña: </p>

    <a href="${process.env.FRONTEND_URL}/forgot_password/${token}"> Cambiar Contraseña </a>

    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  });
};
