import mailchimp from 'mailchimp-marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export default async function handler(req, res) {
  const { email } = req.body;
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });
    return res.redirect('/?joined=true');
  } catch (err) {
    return res.redirect('/?joined=false');
  }
}
