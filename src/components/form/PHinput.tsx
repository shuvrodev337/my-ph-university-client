import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TPhInput = { type: string; name: string; label?: string };

const PHinput = ({ type, name, label }: TPhInput) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        control={control}
        name={name} // instead of using ...register from useFormContext()
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHinput;
/**
 *   //  console.log(name);
  // const { register } = useFormContext();
      <input type={type} id={name} {...register(name)} />

 * Controller from react-hook-form help use react-hook-form inside antd/materialUI/react-date-picker cnomponents.
 * https://react-hook-form.com/docs/usecontroller/controller
 */
