import { AppError } from "../../../shared/errors/app.error";

export class InvalidAutomobileYearError extends AppError {
  constructor() {
    super("Invalid automobile year.", 404);
  }
}