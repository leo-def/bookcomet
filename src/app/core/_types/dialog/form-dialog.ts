import { GenericDialog } from "./generic-dialog";

export interface FormDialog<T> extends GenericDialog {
  formValue: T;
  disabled: boolean;
}
  
        