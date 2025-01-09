export const planModel = {
    type: "object",
    properties: {
        planId: {
            type: "string",
        },

        planName: {
            type: "string",
        },

        planAmout: {
            type: "number",
            format: "float",
        },

        planDescription: {
            type: "string",
        },
    },
};

export const subscriptionModel = {
    type: "object",
    properties: {
        subscriptionId: {
            type: "string",
        },
        userId: {
            type: "string",
        },
        plan: {
            type: "object",
            properties: {
                planId: {
                    type: "string",
                },
                name: {
                    type: "string",
                },
                durationInDays: {
                    type: "integer",
                },
                amount: {
                    type: "number",
                    format: "float",
                },
                description: {
                    type: "string",
                },
                actions: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            actionId: { type: "string" },
                            name: { type: "string" },
                            description: { type: "string" },
                        },
                    },
                },
            },
        },
    },
};

export const paymentMethodModel = {
    type: "object",
    properties: {
        userId: {
            type: "string",
        },

        name: {
            type: "string",
        },

        token: {
            type: "string",
        },
    },
};

export const extractModel = {
    type: "object",
    properties: {
        extractId: {
            type: "string",
        },

        url: {
            type: "string",
        },

        userId: {
            type: "string",
        },

        expiryDate: {
            type: "string",
            format: "date",
        },

        urlExpiryDate: {
            type: "string",
            format: "date",
        },
    },
};

export const expenseModel = {
    type: "object",
    properties: {
        expenseId: {
            type: "string",
        },

        userId: {
            type: "string",
        },

        expenseName: {
            type: "string",
        },

        expenseValue: {
            type: "integer",
        },

        dueDate: {
            type: "string",
            format: "date",
        },

        paid: {
            type: "boolean",
        },
    },
};
