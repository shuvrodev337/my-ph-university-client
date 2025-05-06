import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const PHform = ({ onSubmit, children, defaultValues }: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}> {children}</form>
    </FormProvider>
  );
};

export default PHform;

/**
  * inputs used to"register" from useForm, is not accesble from another component / hook form environment
  * that is why we are using FormProvider context from "react-hook-form"
  * children under FormProvider, can use register/other useForm methods from useFormContext()

 */
