import { Button } from "@/components/ui/button";
import { Home, LogOut, Plus, User } from "lucide-react";
import mainLogo from "@/assets/main-logo.svg";
import { FlexBox } from "../layout/FlexBox";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutThunk } from "@/store/thunk/logoutThunk";

const navigationItems = [
  { label: "About Us", href: "#about" },
  { label: "Latest News", href: "#news" },
  { label: "Our Achievers", href: "#achievers" },
  { label: "Events & Update", href: "#events" },
  { label: "Our Sponsors", href: "#sponsors" },
  { label: "Contact Us", href: "#contact" },
];

export function PageHeader() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const useLoggedOut = Boolean(user?.id == null);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };

  return (
    <div
      className="
        relative w-full
        shadow-[0_2px_0_rgba(0,0,0,0.25),0_8px_24px_rgba(0,0,0,0.20)]
        overflow-hidden"
    >
      {/* Gradient background using theme colors */}
      <div className="relative z-0 w-full bg-gradient-to-r from-primary to-secondary/90">
        {/* Diagonal darker wedge */}
        <div
          className="absolute inset-y-0 left-0 z-0"
          style={{
            width: "55%",
            background:
              "linear-gradient(90deg, rgba(154,14,0,0.15) 0%, rgba(213,55,11,0.75) 60%, rgba(243,126,32,0) 100%)",
            clipPath: "polygon(0 0, 75% 0, 55% 100%, 0% 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top section with logo, title, and action buttons */}
        <FlexBox
          className="z-10 justify-between px-10 py-6 md:px-8"
          firstColWidth="40"
          secondColWidth="60"
        >
          {/* Left: logo + title */}
          <Button variant="ghost" onClick={() => navigate("/")}>
            <FlexBox className="gap-5 md:gap-6">
              <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-sm bg-white/10">
                <img src={mainLogo} alt="KRS Logo" className="object-cover" />
              </div>
              <h3 className="font-extrabold text-white drop-shadow-sm text-left">
                સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ <br />
                વડોદરા
              </h3>
            </FlexBox>
          </Button>

          {/* Right: registration and login buttons */}
          <FlexBox
            orientation="column"
            className="flex items-end justify-end gap-5"
          >
            <div className="flex gap-3">
              {useLoggedOut && (
                <>
                  <Button onClick={() => navigate("/signup")} variant="subtle">
                    <Plus className="mr-0.5 h-4 w-4" />
                    Member Registration
                  </Button>
                  <Button onClick={() => navigate("/login")} variant="subtle">
                    <User className="mr-0.5 h-4 w-4" />
                    Member Login
                  </Button>
                  <Button
                    disabled
                    onClick={() => navigate("/student-signup")}
                    variant="subtle"
                  >
                    <Plus className="mr-0.5 h-4 w-4" />
                    Student Registration
                  </Button>
                </>
              )}
              {!useLoggedOut && (
                <>
                  <h4 className="text-white/90 self-center mr-4">
                    Welcome, {user?.user_metadata?.firstName || "User"}
                  </h4>
                  <Button onClick={() => handleLogout()} variant="subtle">
                    <LogOut className="mr-0.5 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </div>
            {useLoggedOut && (
              <nav className="flex items-end justify-end flex-wrap gap-6 md:gap-8">
                <Home className="h-5 w-5 text-white/90" />
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm md:text-base font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </FlexBox>
        </FlexBox>
      </div>
    </div>
  );
}
