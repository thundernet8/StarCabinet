const SCCategorySchema = {
    title: "SC Category schema",
    description: "describes a single SC category",
    version: 0,
    type: "object",
    properties: {
        key: {
            type: "string",
            primary: true // just string of id
        },
        id: {
            type: "integer",
            index: true
        },
        name: {
            type: "string"
        },
        description: {
            type: "string"
        },
        repos: {
            type: "array",
            uniqueItems: true,
            item: "integer"
        },
        createdAt: {
            type: "string"
        },
        createdTime: {
            type: "integer"
        },
        updatedAt: {
            type: "string"
        },
        updatedTime: {
            type: "integer"
        }
    },
    required: ["id", "name"]
};

export default SCCategorySchema;
