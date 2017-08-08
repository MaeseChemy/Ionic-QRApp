import { Coords } from './coords.model';
import { ContactData } from './contact-data.model';
import { MailData } from './mail-data.model';

export class ScanData {
    info: string;
    type: string;
    icon: string;
    date: Date;

    constructor(scanDataTxt: string){
        this.type = "undefined";
        this.info = scanDataTxt;
        this.date = new Date();
        if(scanDataTxt.startsWith("http")){
            this.type = "HTTP";
            this.icon = "logo-chrome";
        }else if(scanDataTxt.startsWith("geo")){
            this.type = "MAP";
            this.icon = "md-map";
        }else if(scanDataTxt.startsWith("BEGIN:VCARD")){
            this.type = "CONTACT";
            this.icon = "contact";
        }else if (scanDataTxt.startsWith("MATMSG")){
            this.type = "MAIL";
            this.icon = "mail";
        }

    }

    public static parseCoords(input: string): Coords {
        let positions = input.substr(input.indexOf(':')+1);
        let coords: string[] = positions.split(',');
        let lat = parseFloat(coords[0]);
        let lng = parseFloat(coords[1]);

        return new Coords(lat, lng);
    }

    public static parseMail(input: String): MailData{
        let content = input.substr(input.indexOf(':')+1);

        let fieldsStr: string[] = content.split(';');
        let fields: any =  {};

        fieldsStr.forEach(element => {
            let data: string[] = element.split(':');
            fields[data[0].toLowerCase()] = data[1];
        });

        return new MailData(fields.to, fields.sub, fields.body);
    }

    public static parseContact(input: String): ContactData{
        var vCardFields: any = this.parseVCard(input);
        console.log(vCardFields);
        var contact: ContactData = new ContactData();
        contact.fullName = vCardFields.fn;
        contact.organization = vCardFields.org;
        if(vCardFields.tel){
            vCardFields.tel.forEach(phoneData => {
                contact.phones.unshift(phoneData.value[0]);
            });
        }
        if(vCardFields.email){
            vCardFields.email.forEach(emailData => {
                contact.emails.unshift(emailData.value[0]);
            });
        }
        if(vCardFields.adr){
            vCardFields.adr.forEach(directionData => {
                console.log(directionData.value);
                var dir: string = "";
                directionData.value.forEach(element => {
                    if(element && element != ""){
                        dir+=" "+element;
                    }
                });
                contact.directions.unshift(dir);
            });
        }
        return contact;
    }

    private static parseVCard(input: String){

        var Re1 = /^(version|fn|title|org):(.+)$/i;
        var Re2 = /^([^:;]+);([^:]+):(.+)$/;
        var ReKey = /item\d{1,2}\./;
        var fields = {};

        input.split(/\r\n|\r|\n/).forEach(function (line) {
            var results, key;

            if (Re1.test(line)) {
                results = line.match(Re1);
                key = results[1].toLowerCase();
                fields[key] = results[2];
            } else if (Re2.test(line)) {
                results = line.match(Re2);
                key = results[1].replace(ReKey, '').toLowerCase();

                var meta = {};
                results[2].split(';')
                    .map(function (p, i) {
                    var match = p.match(/([a-z]+)=(.*)/i);
                    if (match) {
                        return [match[1], match[2]];
                    } else {
                        return ["TYPE" + (i === 0 ? "" : i), p];
                    }
                })
                    .forEach(function (p) {
                    meta[p[0]] = p[1];
                });

                if (!fields[key]) fields[key] = [];

                fields[key].push({
                    meta: meta,
                    value: results[3].split(';')
                })
            }
        });

        return fields;
    }
}