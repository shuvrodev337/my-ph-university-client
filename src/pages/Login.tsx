import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";

type LoginFormInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  /**
   * flow->
   * use "useLoginMutation" hook from rtk-query to post login credential of an user,
   * use verifyToken util function to extract user from accessToken
   * dispatch "setUser" action to set the "auth" state.
   * set the extracted user info as user and accessToken as token inside "auth" state
   */
  const onSubmit: SubmitHandler<LoginFormInputs> = async (userCredentials) => {
    const res = await login(userCredentials).unwrap();
    const user = verifyToken(res?.data?.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
