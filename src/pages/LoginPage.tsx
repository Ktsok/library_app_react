import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFields, loginSchema } from "../api/login.ts";
// import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";
import { Label } from "../components/ui/label.tsx";
import { useAuth } from "../hooks/useAuth.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {cn} from "../lib/utils.ts";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    try {
      await loginUser(data);
      toast.success("Login successfully");
      navigate("/books");
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
          <input className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          )}
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
          <input className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          )}
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
