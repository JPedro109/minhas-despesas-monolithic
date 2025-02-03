import path from "node:path";
import fs from "node:fs";

import { environmentVariables } from "@/shared";
import { EmailTemplateEnum, INotification } from "@/layers/application";

import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import handlebars from "handlebars";
import juice from "juice";

export class NotificationAdapter implements INotification {
    private readonly mail: Transporter<SentMessageInfo>;

    constructor() {
        this.mail = nodemailer.createTransport({
            host: environmentVariables.hostProviderEmail,
            port: environmentVariables.portProviderEmail,
            secure: environmentVariables.portProviderEmail === 465,
            auth: {
                user: environmentVariables.emailProviderEmail,
                pass: environmentVariables.passwordProviderEmail,
            },
        });
    }

    async sendEmail(
        to: string,
        type: EmailTemplateEnum,
        props?: object,
    ): Promise<void> {
        const htmlBuffer = fs.readFileSync(
            path.resolve(__dirname, `./templates/${type}.html`),
        );
        const cssBuffer = fs.readFileSync(
            path.resolve(__dirname, "./templates/styles/main.css"),
        );

        const template = handlebars.compile(htmlBuffer.toString());
        const html = template(props);

        const inlinedHtml = juice.inlineContent(html, cssBuffer.toString());

        const email = {
            from: environmentVariables.senderEmail,
            to,
            subject: this.setSubject(type),
            html: inlinedHtml,
        };

        await this.mail.sendMail(email);
    }

    private setSubject(type: EmailTemplateEnum): string {
        const templates = {
            "notify-subscription-payment-failure-template":
                "Problema na Cobrança da Assinatura",
            "recovery-user-password-template": "Recuperação de Senha",
            "update-user-email-template": "Atualização de E-mail",
            "verify-user-email-template": "Verificação de E-mail",
        };

        return templates[type];
    }
}
