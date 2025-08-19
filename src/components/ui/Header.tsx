import AuthButtons from "../AuthButtons";
import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";

export default function Header({ user, setUser }: { user: any; setUser: any }) {
  console.log("Header user:", user);
  return (
    <header className="flex items-center justify-between px-6 py-2 border-b">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16v16H4z" fill="none" />
          <path
            d="M12 2L2 7l10 5 10-5-10-5zm0 7l-10-5v13l10 5 10-5V4l-10 5z"
            fill="currentColor"
          />
        </svg>
        <span className="text-lg font-semibold">BookSwap</span>
      </div>

      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-gray-700">
            Browse
          </a>
          <a href="#" className="text-sm font-medium hover:text-gray-700">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium hover:text-gray-700">
            Community
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Home" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-600 hover:text-orange-700 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h15v-9.75"
              />
            </svg>
          </Link>

          {!user && <AuthButtons />}
          {user && <ProfileMenu user={user} setUser={setUser} />}
        </div>
      </div>
    </header>
  );
}
