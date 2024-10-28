import {
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormReset,
  UseFormResetField,
} from "react-hook-form";

export interface IUseForm {
  control: Control<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  formState: {
    errors: any;
  };
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  getValues: UseFormGetValues<any>;
  setError: UseFormSetError<any>;
  trigger: (name?: string | string[]) => Promise<boolean>;
  reset: UseFormReset<any>;
  resetField: UseFormResetField<any>;
}
