"use client";
import axios from "axios";
import Button from "@/app/components/inputs/button";
import Input from "@/app/components/inputs/input";
import { useState, useCallback, useEffect } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
     const router = useRouter()
     const { status } = useSession()
     const [variant, setVariant] = useState<Variant>("LOGIN");
     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          console.log(status);

          if (status === "authenticated") {
               router.push("/users")
          }
     }, [status, router])

     const toggleVariant = useCallback(() => {
          if (variant === "LOGIN") {
               setVariant("REGISTER");
          } else {
               setVariant("LOGIN");
          }
     }, [variant]);

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm<FieldValues>({
          defaultValues: {
               name: "",
               email: "",
               password: "",
          },
     });

     const onSubmit: SubmitHandler<FieldValues> = data => {
          setIsLoading(true);

          if (variant === "REGISTER") {
               axios.post("/api/register", data)
                    .then(() => signIn("credentials", data))
                    .catch(() => toast.error("Something went wrong!"))
                    .finally(() => setIsLoading(false));
          }

          if (variant === "LOGIN") {
               signIn("credentials", {
                    ...data,
                    redirect: false,
               })
                    .then(result => {
                         if (result?.error) {
                              toast.error("Invalid email and password");
                         }
                         if (result?.ok) {
                              toast.success("Logged in successfully");
                              router.push("/users")
                         }
                    })
                    .catch(() => toast.error("Failed to login"))
                    .finally(() => setIsLoading(false));
          }
     };

     const socialActions = (action: string) => {
          setIsLoading(true);
          signIn(action, { redirect: false })
               .then((result) => {
                    if (result?.error) {
                         toast.error("Something went wrong, Try Again!")
                    }
                    if (result?.ok) {
                         toast.success("Logged in successfully");
                         router.push("/users")
                    }
               }).catch(() => {
                    toast.error("Something went wrong, Try Again!")
               })
               .finally(() => setIsLoading(false))
     };

     return (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
               <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                         {variant === "REGISTER" && <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} required />}
                         <Input id="email" label="Email" register={register} errors={errors} type="email" disabled={isLoading} required />
                         <Input id="password" label="Password" register={register} errors={errors} type="password" disabled={isLoading} required />
                         <div>
                              <Button type="submit" disabled={isLoading} fullWidth>
                                   {variant === "LOGIN" ? "Login" : "Register"}
                              </Button>
                         </div>
                    </form>

                    <div className="mt-8">
                         <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                   <div className="w-full border-t border-gray-300" />
                              </div>
                              <div className="relative flex justify-center text-sm">
                                   <span className="bg-white px-2 text-gray-500">Or continue with</span>
                              </div>
                         </div>

                         <div className="mt-6 flex gap-2">
                              <AuthSocialButton icon={BsGithub} onClick={() => socialActions("github")} />
                              <AuthSocialButton icon={BsGoogle} onClick={() => socialActions("google")} />
                         </div>
                    </div>
                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                         <div>{variant === "LOGIN" ? "New to Nook? " : "Already have an account?"}</div>
                         <div onClick={toggleVariant} className="underline cursor-pointer">
                              {variant === "LOGIN" ? "Create an account" : "Please Login"}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default AuthForm;
