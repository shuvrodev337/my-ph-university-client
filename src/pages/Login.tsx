import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

type LoginFormInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login, { isError, isLoading, isSuccess, data }] = useLoginMutation();

  const { register, handleSubmit } = useForm<LoginFormInputs>(); // 👈 Add <LoginFormInputs> here

  const onSubmit: SubmitHandler<LoginFormInputs> = (userCredentials) => {
    login(userCredentials);
  };
  console.log({ isError, isLoading, isSuccess, data });

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
