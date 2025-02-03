import { environmentVariables } from "@/shared";
import { databaseSQLHelper } from "@/main/factories";
import { setupServer } from "@/main/setup-server";

const port = environmentVariables.port;

databaseSQLHelper
    .connect()
    .then(async () =>
        setupServer().listen(port || 3333, () =>
            console.log(`Server is running at Port ${port || 3333}`),
        ),
    )
    .catch(console.error);
