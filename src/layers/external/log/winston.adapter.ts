import { ILog } from "@/layers/application";
import winston from "winston";

export class WinstonAdapter implements ILog {
    private logger: winston.Logger = WinstonAdapter.create();

    private static create(): winston.Logger {
        const levels = {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            debug: 4,
        };

        const colors = {
            error: "red",
            warn: "yellow",
            info: "green",
            http: "magenta",
            debug: "white",
        };

        winston.addColors(colors);

        const format = winston.format.combine(
            winston.format.timestamp({ format: "DD/MM/YYYY HH:mm:ss:ms" }),
            winston.format.colorize({ all: true }),
            winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`,
            ),
        );

        const transports = [new winston.transports.Console()];

        return winston.createLogger({
            levels,
            format,
            transports,
        });
    }

    trace(message: string, trace: string): boolean {
        this.logger.info(`${message} - ${trace}`);

        return true;
    }

    info(message: string): boolean {
        this.logger.info(message);

        return true;
    }

    warning(message: string): boolean {
        this.logger.warn(message);

        return true;
    }

    error(message: string, error: Error): boolean {
        this.logger.error(`${message}\n${error.stack}`);

        return true;
    }
}
