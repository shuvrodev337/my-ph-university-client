import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PHform from "../components/form/PHform";
import PHinput from "../components/form/PHinput";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //set defaultvalues for testing purpose
  const defaultValues = {
    id: "A-0001",
    password: "kichuakta",
  };
  const onSubmit = async (userCredentials: FieldValues) => {
    console.log(userCredentials);

    const toastLoginId = toast.loading("Logging in...", {
      position: "bottom-center",
    });
    try {
      const res = await login(userCredentials).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Log in successful", {
        id: toastLoginId,
        duration: 2000,
        position: "bottom-center",
      });
      navigate(`/${user.role}/dashboard`);
    } catch (error: any) {
      if (error?.status === 404) {
        toast.error("User not found", {
          id: toastLoginId,
          duration: 2000,
          position: "bottom-center",
        });
      } else {
        toast.error("Something wont wrong!!!", {
          id: toastLoginId,
          duration: 2000,
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHform onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHinput type={"text"} name={"id"} label={"Id : "} />
        <PHinput type={"text"} name={"password"} label={"Password : "} />

        <Button htmlType="submit">Submit</Button>
      </PHform>
    </Row>
  );
};

export default Login;

/**
 * flow->
 * use "useLoginMutation" hook from rtk-query to post login credential of an user,
 * use verifyToken util function to extract user from accessToken
 * dispatch "setUser" action to set the "auth" state.
 * set the extracted user info as "user" and accessToken as "token" inside "auth" state
 * -*-
 * sonner toast takes an object, where we can show all related toasts im one toast by using id
 */
