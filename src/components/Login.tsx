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
import { useNavigate } from "react-router-dom";
const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "At least 6 characters"),
});
type FormValues = z.infer<typeof schema>;

export default function Login({ setUser }: { setUser: (user: any) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("LOGIN:", data);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        data
      );
      console.log("Login successful:", res.data);
      setUser(res.data);
      localStorage.setItem("token", res.data.access_token);
      navigate("/");
      // Handle successful login (e.g., redirect, store token)
    } catch (error: any) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      // Handle error (e.g., show error message)
    }
  };
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-sm p-6">
      <Card className="p-6">
        <h1 className="mb-4 text-xl font-semibold">Log In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Log In
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
