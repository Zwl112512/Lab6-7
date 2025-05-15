// schemas/users.ts
export const userSchema = {
  type: "object",
  required: ["firstname", "lastname", "username", "password", "email"],
  properties: {
    firstname: { type: "string" },
    lastname: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
    passwordsalt: { type: "string" },
    email: { type: "string", format: "email" },
    about: { type: "string" },
    avatarurl: { type: "string", format: "uri" }
  },
  additionalProperties: false
}
