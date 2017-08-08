export class ContactData {
    fullName: string = "";
    organization: string = "";
    directions: string[] = [];
    emails: string[]  = [];
    phones: string[] = [];

    toString(): string{
        return "Contact: FullName["+this.fullName+"] - Organization["+this.organization+"] - Direction["+this.directions+"] - Email["+this.emails+"] - Phones["+this.phones+"]";
    }
}
