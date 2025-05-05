import { Input } from "antd";
import { Controller } from "react-hook-form";

type TPhInput = { type: string; name: string; label?: string };

const PHinput = ({ type, name, label }: TPhInput) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : null}
      <Controller
        name={name} // instead of using ...register from useFormContext()
        render={(field) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PHinput;
/**
 * Controller from react-hook-form help use react-hook-form inside antd/materialUI/react-date-picker cnomponents.
 * https://react-hook-form.com/docs/usecontroller/controller
 */
