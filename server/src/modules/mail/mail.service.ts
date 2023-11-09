import SES, { SendEmailRequest } from 'aws-sdk/clients/ses';

export class MailService {
  private ses: SES;

  constructor() {
    this.ses = new SES({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const params: SendEmailRequest = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: "noreply@huisangyun.com"
    };

    await this.ses.sendEmail(params).promise();
  }
}
