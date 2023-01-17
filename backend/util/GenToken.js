import jwt from "jsonwebtoken";
export function generateToken(id) {
  return jwt.sign({ id }, process.env.TOKEN_JWT, {
    expiresIn: "30d",
  });
}
