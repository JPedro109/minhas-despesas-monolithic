import { environmentVariables } from "@/shared";
import { setupRest } from "@/main/rest";

import express, { Express } from "express";
import cors from "cors";

export const setupServer = (): Express => {
    const initExpress = express();

    initExpress.use(
        cors({
            origin: (
                origin: string,
                callback: (argOne?: Error, argTwo?: boolean) => void,
            ) => {
                const allowList = [environmentVariables.appUrl];

                if (environmentVariables.nodeEnv !== "production")
                    return callback(null, true);

                if (allowList.indexOf(origin) !== -1)
                    return callback(null, true);

                callback(new Error("Not allowed cors"));
            },
        }),
    );
    initExpress.use(express.json());
    setupRest(initExpress);

    return initExpress;
};
