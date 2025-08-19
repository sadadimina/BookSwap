import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

export default function Verify() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setOk("");

      await axios.post("http://localhost:3000/api/v1/auth/verify", {
        code,
        email: localStorage.getItem("signup_email"),
      });

      setOk("Verification successful!");
      navigate("/login");
      toast.success("Verification successful! You can now log in.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      <Card className="p-6 space-y-4">
        <h1 className="text-xl font-semibold">Enter verification code</h1>
        {error && <p className="text-red-500">{error}</p>}
        {ok && <p className="text-green-600">{ok}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            type="submit"
            disabled={loading || code.length < 6}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
