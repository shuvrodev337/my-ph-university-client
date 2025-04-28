import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";

type LoginFormInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { register, handleSubmit } = useForm<LoginFormInputs>(); // 👈 Add <LoginFormInputs> here

  const onSubmit: SubmitHandler<LoginFormInputs> = async (userCredentials) => {
    const res = await login(userCredentials).unwrap();
    const user = verifyToken(res?.data?.accessToken);
    const dispatchdata = { user: user, token: res.data.accessToken };
    // console.log(dispatchdata);
    dispatch(setUser(dispatchdata));
  };
  console.log(user);

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
