import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFields, loginSchema } from "../../../../../../Projects/reactcf/untitled/cf7-react-crud/src/api/login.ts";
import { Input } from "../../../../../../Projects/reactcf/untitled/cf7-react-crud/src/components/ui/input.tsx";
import { Button } from "../../../../../../Projects/reactcf/untitled/cf7-react-crud/src/components/ui/button.tsx";
import { Label } from "../../../../../../Projects/reactcf/untitled/cf7-react-crud/src/components/ui/label.tsx";
import { useAuth } from "../../../../../../Projects/reactcf/untitled/cf7-react-crud/src/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    try {
      await loginUser(data);
      toast.success("Login successfully");
      navigate("/products");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-8 space-y-4 border rounded"
      >
        <h1>Login</h1>
        <div>
          <Label htmlFor="username" className="mb-1"></Label>
          <Input
            id="username"
            autoFocus
            {...register("username")}
            disabled={isSubmitting}
          />
          {errors.username && (
            <div className="text-cf-dark-red">{errors.username.message}</div>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="mb-1"></Label>
          <Input
            id="password"
            type="password"
            autoFocus
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors.password && (
            <div className="text-cf-dark-red">{errors.password.message}</div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging ..." : "Login"}
        </Button>
      </form>
    </>
  );
}
