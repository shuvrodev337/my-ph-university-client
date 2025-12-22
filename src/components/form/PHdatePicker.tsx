import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import { Form } from "antd";
type TPhdatePickerProps = {
  label?: string;
  name: string;
};

const PHdatePicker = ({ name, label }: TPhdatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <DatePicker {...field} style={{ width: "100%" }} size="large" />

          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHdatePicker;
