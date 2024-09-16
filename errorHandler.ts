import { IAlertState } from "./store";

export default (error: unknown, alert: IAlertState) => {
  if (error instanceof Error) {
    alert.setMessage(error.message)
    alert.setTitle("Error");
    alert.setIsOpen(true)
  } else {
    alert.setMessage("Unknown error")
    alert.setTitle("Error");
    alert.setIsOpen(true)
  }
}