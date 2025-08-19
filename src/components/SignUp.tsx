import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import Verify from "./Verify";

const schema = z
  .object({
    firstName: z.string().min(2, "at least 2 characters"),
    lastName: z.string().min(2, "at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "at least 6 characters"),
    confirm: z.string().min(6),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
type FormValues = z.infer<typeof schema>;

export default function SignUp() {
  const [verified, setVerified] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });
  const onSubmit = async (data: FormValues) => {
    const { confirm, ...rest } = data;
    console.log("SIGN UP:", rest);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        rest
      );
      console.log("Sign up successful:", res.data);
      localStorage.setItem("signup_email", data.email);
      setVerified(true);
    } catch (error: any) {
      console.error(
        "Error during sign up:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      {!verified && (
        <Card className="p-6">
          <h1 className="mb-4 text-xl font-semibold">Create account</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </Card>
      )}
      {verified && <Verify />}
    </div>
  );
}
