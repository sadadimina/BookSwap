import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name?: string;
  email: string;
  avatarUrl?: string;
};

export default function ProfileMenu({
  user,
  setUser,
}: {
  user: User;
  setUser: (u: User | null) => void;
}) {
  const navigate = useNavigate();
  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus:outline-none">
        <Avatar className="h-8 w-8 ring-1 ring-gray-200">
          {user.avatarUrl && (
            <AvatarImage src={user.avatarUrl} alt={user.name || user.email} />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">
          {user.name || user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
