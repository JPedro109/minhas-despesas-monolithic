import "dotenv/config";

type EnvironmentVariables = {
    appUrl: string;
    jwtKey: string;
    basicAuthenticationUser: string;
    basicAuthenticationPassword: string;
    nodeEnv: string;
    awsAccessKeyId: string;
    secretAccessKey: string;
    awsRegion: string;
    awsBucketName: string;
    localstackEndpoint: string;
    sendEmailQueue: string;
    stripeSecretKey: string;
    port: number;
    webhookSecret: string;
};

export const environmentVariables: EnvironmentVariables = {
    appUrl: process.env.APP_URL,
    jwtKey: process.env.JWT_KEY,
    basicAuthenticationUser: process.env.BASIC_AUTHENTICATION_USER,
    basicAuthenticationPassword: process.env.BASIC_AUTHENTICATION_PASSWORD,
    nodeEnv: process.env.NODE_ENV,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    sendEmailQueue: process.env.SEND_MAIL_QUEUE,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    port: parseInt(process.env.PORT),
    localstackEndpoint: process.env.LOCALSTACK_ENDPOINT,
    webhookSecret: process.env.WEBHOOK_SECRET,
};
