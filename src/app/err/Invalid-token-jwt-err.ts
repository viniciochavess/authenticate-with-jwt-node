export class InvalidTokenJwtError extends Error {
  constructor() {
    super("Invalid token jwt");
    this.name = "InvalidTokenJwtError";
  }
}