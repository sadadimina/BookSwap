import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "default";
};

export default function AuthButtons({ className, size = "sm" }: Props) {
  return (
    <div className={cn("inline", className)}>
      <Button asChild size={size} className="text-white mx-2">
        <Link to="/signup">Sign Up</Link>
      </Button>
      <Button
        asChild
        variant="secondary"
        size={size}
        className="hover:bg-gray-300"
      >
        <Link to="/login">Log In</Link>
      </Button>
    </div>
  );
}
