import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail({ to, subject, text, html }) {
  const msg = {
    to,
    from: `Manuel Duarte <${process.env.SENDGRID_EMAIL}>`, 
    subject,
    text,
    html,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('Message sent: %s', response[0].statusCode);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}
