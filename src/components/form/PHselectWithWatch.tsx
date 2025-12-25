import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPhselectProps = {
  label?: string;
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  //   onValueChange
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
        mode?: "multiple" | undefined;
      }[]
    | undefined;
};

const PHselectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TPhselectProps) => {
  const methods = useFormContext();
  const inputValue = useWatch({
    control: methods.control,
    name,
  });
  console.log(inputValue);
  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            //    defaultValue="lucy"
            style={{ width: "100%" }}
            //  onChange={handleChange} //  onChange will be handled by hook form controller by   {...field}
            {...field}
            options={options}
            disabled={disabled}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHselectWithWatch;

/**
 * All the forms are wrapped by FormProvider
 * methods are spread in Formprovider
 * we can access those methods by using useFormcontext hook,ONLY inside the components which are wrapped by FormProvider
 */
