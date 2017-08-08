export class MailData {
    to: string;
    subject: string;
    body: string;

    constructor(to: string, subject: string, body: string){
        this.to = to;
        this.subject = subject;
        this.body = body;
    }

    emailTo(): string{
        return ("mailto:"+this.to+"?subject="+this.subject+"&body="+this.body).replace(/ /g,"%20");
    }
}