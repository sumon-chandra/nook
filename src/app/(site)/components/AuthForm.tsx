"use client";
import axios from "axios";
import Button from "@/app/components/inputs/button";
import Input from "@/app/components/inputs/input";
import { useState, useCallback } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
     const [variant, setVariant] = useState<Variant>("LOGIN");
     const [isLoading, setIsLoading] = useState(false);

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
               axios.post("/api/register", data);
          }

          if (variant === "REGISTER") {
               // TODO: NextAuth SignIn
          }
     };

     const socialActions = (action: string) => {
          setIsLoading(true);

          // TODO: NextAuth Social Sign in
     };

     return (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
               <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                         {variant === "REGISTER" && <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />}
                         <Input id="email" label="Email" register={register} errors={errors} disabled={isLoading} />
                         <Input id="password" label="Password" register={register} errors={errors} type="password" disabled={isLoading} />
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
                              <AuthSocialButton icon={BsGoogle} onClick={() => socialActions("github")} />
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
