import { AppError } from "../../../shared/errors/app.error"


export class InexistAutomobileError extends AppError {
  constructor() {
    super("Automobile was not found.", 404)
  }
}