import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

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

  type SubmitFormSchemaType = z.infer<
    typeof formLoginSchema | typeof formRegisterSchema
  >;

  // 2. Define a submit handler.
  function onSubmit(values: SubmitFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  onSubmit={registerForm.handleSubmit(onSubmit)}
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
                  onSubmit={loginForm.handleSubmit(onSubmit)}
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
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
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
