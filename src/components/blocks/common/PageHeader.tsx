import { Button } from "@/components/ui/button";
import { Home, Plus, Undo2, User } from "lucide-react";
import mainLogo from "@/assets/main-logo.svg";
import { FlexBox } from "../layout/FlexBox";
import { useNavigate } from "react-router";

const navigationItems = [
  { label: "About Us", href: "#about" },
  { label: "Latest News", href: "#news" },
  { label: "Our Achievers", href: "#achievers" },
  { label: "Events & Update", href: "#events" },
  { label: "Our Sponsors", href: "#sponsors" },
  { label: "Contact Us", href: "#contact" },
];

interface PageHeaderProps {
  hideNav?: boolean;
}

export function PageHeader({ hideNav = false }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className="
        relative w-full
        shadow-[0_2px_0_rgba(0,0,0,0.25),0_8px_24px_rgba(0,0,0,0.20)]
        overflow-hidden"
    >
      {/* Gradient background using theme colors */}
      <div className="relative z-0 w-full bg-gradient-to-r from-primary to-primary">
        {/* Diagonal darker wedge */}
        <div
          className="absolute inset-y-0 left-0 z-0 hidden md:block"
          style={{
            width: "55%",
            background:
              "linear-gradient(90deg, rgba(154,14,0,0.15) 0%, rgba(213,55,11,0.45) 60%, rgba(243,126,32,0) 100%)",
            clipPath: "polygon(0 0, 75% 0, 55% 100%, 0% 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top section with logo, title, and action buttons */}
        <FlexBox
          className="z-10 px-4 py-4 sm:px-6 md:px-8 lg:px-10 items-start md:items-center"
          firstColWidth="40"
          secondColWidth="60"
          orientation="column"
          rotational
        >
          {/* Left: logo + title */}
          <Button variant="ghost" onClick={() => navigate("/")} className="p-0">
            <FlexBox className="gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <div className="relative shrink-0 overflow-hidden rounded-sm bg-white/10 h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20">
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
            className="flex items-end justify-end gap-3 md:gap-5"
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
              {hideNav && (
                <Button
                  onClick={() => navigate("/")}
                  variant="secondary"
                  className="mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm"
                >
                  <Undo2 className="mr-0.5 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Back to Home Page</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              )}
              <Button
                onClick={() => navigate("/signup")}
                variant="subtle"
                className="text-xs sm:text-sm"
              >
                <Plus className="mr-0.5 h-3 w-3 sm:h-4 sm:w-4" />
                Member Registration
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="subtle"
                className="text-xs sm:text-sm"
              >
                <User className="mr-0.5 h-3 w-3 sm:h-4 sm:w-4" />
                Member Login
              </Button>
              <Button
                disabled
                onClick={() => navigate("/student-signup")}
                variant="subtle"
                className="hidden lg:flex text-xs sm:text-sm"
              >
                <Plus className="mr-0.5 h-3 w-3 sm:h-4 sm:w-4" />
                Student Registration
              </Button>
            </div>
            {!hideNav && (
              <nav className="items-end justify-end flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8 hidden md:flex">
                <Home className="h-4 w-4 sm:h-5 sm:w-5 text-white/90" />
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-white/90 hover:text-white hover:underline transition-colors duration-200 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </FlexBox>
        </FlexBox>
      </div>
    </header>
  );
}
