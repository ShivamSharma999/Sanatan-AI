const tools = [
  {
    functionDeclarations: [
      {
        name: "push_memory",
        description: "Adds a memory in memories to remember",
        parameters: {
            type: "OBJECT",
            properties : {
                memory: {
                    type: "STRING",
                    description: "The memory to remember"
                }
            },
            required: ["memory"],
        }
      },
      {
        name: "delete_memory",
        description: "Deletes a memory in from the list of memories",
        parameters: {
            type: "OBJECT",
            properties : {
                memory: {
                    type: "STRING",
                    description: "The memory to delete"
                }
            },
            required: ["memory"],
        }
      },
      {
        name: "name",
        description: "Names the chat",
        parameters: {
            type: "OBJECT",
            properties : {
                name: {
                    type: "STRING",
                    description: "The short name of the whole chat"
                }
            },
            required: ["name"],
        }
      },
      {
        name: "open",
        description: "Opens a webpage specified.",
        parameters: {
          type: "STRING",
          description: "The url to open."
        }
      }
    ],
  },
];
export default tools;