import { AppError } from "../../../shared/errors/app.error";

export class DuplicatePlateError extends AppError {
  constructor() {
    super("Automobile with this plate already exists.", 409);
  }
}
