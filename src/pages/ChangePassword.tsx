import { Button, Row } from "antd";
import PHform from "../components/form/PHform";
import PHinput from "../components/form/PHinput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { usePasswordChangeMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [changePassword] = usePasswordChangeMutation();
  // const defaultValues = {
  //   oldPassword: "2025010001",
  //   newPassword: "kichuakta2",
  // };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await changePassword(data);
    if (res?.data?.success) {
      dispatch(logOut());
      navigate(`/login`);
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHform onSubmit={onSubmit}>
        <PHinput type={"text"} name={"oldPassword"} label={"Old password"} />
        <PHinput type={"text"} name={"newPassword"} label={"New Password"} />

        <Button htmlType="submit">Submit</Button>
      </PHform>
    </Row>
  );
};

export default ChangePassword;
