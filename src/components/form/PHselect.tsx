import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPhselectProps = {
  label?: string;
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
        mode?: "multiple" | undefined;
      }[]
    | undefined;
};

const PHselect = ({ label, name, options, disabled, mode }: TPhselectProps) => {
  /*
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
*/
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

export default PHselect;
