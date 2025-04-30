import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  /**
   * flow->
   * use "useLoginMutation" hook from rtk-query to post login credential of an user,
   * use verifyToken util function to extract user from accessToken
   * dispatch "setUser" action to set the "auth" state.
   * set the extracted user info as "user" and accessToken as "token" inside "auth" state
   */

  const onSubmit: SubmitHandler<LoginFormInputs> = async (userCredentials) => {
    const toastLoginId = toast("Logging in...");
    try {
      const res = await login(userCredentials).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast("Log in successful", { id: toastLoginId, duration: 2000 }); // sonner toast takes an object, where we can show all related toasts im one toast by using id
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast("Something wont wrong!!!", { id: toastLoginId, duration: 2000 });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="id">Id</label>
      <input type="text" {...register("id")} />

      <label htmlFor="password">Password</label>
      <input type="text" {...register("password")} />

      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
