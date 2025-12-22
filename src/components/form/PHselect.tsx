import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPhselectProps = {
  label?: string;
  name: string;
  disabled?: boolean;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
};

const PHselect = ({ label, name, options, disabled }: TPhselectProps) => {
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
