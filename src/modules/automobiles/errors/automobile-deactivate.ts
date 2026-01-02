import { AppError } from "../../../shared/errors/app.error";

export class AutomobileDeactivated extends AppError {
  constructor() {
    super("Automobile with this plate already deactivated.", 409);
  }
}
