import { Form } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";
import {
  useLoginMutation,
  useRegistrationMutation,
} from "@/redux/api/authApiSlice";
import { toast } from "sonner";
import { Roles } from "@/types";

interface AuthProps {
  title: string;
  description: string;
  btnTitle: string;
  btnText: string;
  btnLink: string;
  submitBtnLabel: string;
  mode: "model" | "page";
  formType: "register" | "login";
}

const formLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(7, {
    message: "Password must be at least 8 characters.",
  }),
});

const formRegisterSchema = z.object({
  firstName: z.string().min(1, { message: "This field has to be filled." }),
  lastName: z.string().min(1, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(7, {
    message: "Password must be at least 8 characters.",
  }),
});

const Auth: React.FC<AuthProps> = ({
  description,
  title,
  btnTitle,
  btnText,
  btnLink,
  submitBtnLabel = "Sign up",
  mode = "model",
  formType,
}) => {
  const navigate = useNavigate();
  const [
    register,
    { isSuccess: isRegisterSuccesss, isError: isRegisterError },
  ] = useRegistrationMutation();

  const [login, { isSuccess, isError }] = useLoginMutation();

  // 1. Define your form.
  const loginForm = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  // 2. Define a submit handler.
  async function onRegisterSubmit(values: z.infer<typeof formRegisterSchema>) {
    const registerFormData = { ...values, role: Roles.ADMIN };
    await register(registerFormData);

    if (isRegisterSuccesss) {
      toast("Register Success");
      navigate(`${redirect}`);
    }

    if (isRegisterError) {
      toast.error("Password must be 8 characters long, try -->" + "12345678");
    }
  }

  async function onLoginSubmit(values: z.infer<typeof formLoginSchema>) {
    await login(values);

    if (isSuccess) {
      toast.success("Login Success");
      navigate(`${redirect}`);
    }

    if (isError) {
      toast.error("Password must be 8 characters long, try -->" + "12345678");
    }
  }

  if (mode === "model") {
    return (
      <>
        <h1>Model</h1>
      </>
    );
  }

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[729px] 2xl:min-h-screen">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[400px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-balance text-muted-foreground">
                {description}
              </p>
            </div>

            {formType === "register" && (
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="grid gap-4"
                >
                  <RegisterForm form={registerForm} />

                  <Button type="submit" className="w-full">
                    {submitBtnLabel}
                  </Button>
                </form>
              </Form>
            )}

            {formType === "login" && (
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="grid gap-4"
                >
                  <LoginForm form={loginForm} />

                  <Button type="submit" className="w-full">
                    {submitBtnLabel}
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-4 text-center text-sm">
              {btnText}{" "}
              <Link to={btnLink} className="underline">
                {btnTitle}
              </Link>
            </div>

            {/* Demo Account Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 flex items-center">
                <h2 className="flex-1 text-lg font-semibold text-pretty">
                  Email
                </h2>
                <p className="text-sm text-gray-800 font-bold">demo@demo.com</p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center">
                <h2 className="grow text-lg font-semibold text-pretty">
                  Password
                </h2>
                <p className="text-sm text-gray-800 font-bold">12345678</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default Auth;
