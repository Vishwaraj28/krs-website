import { Button } from "@/components/ui/button";
import { FacebookIcon, HeartIcon, InstagramIcon } from "lucide-react";
import mainLogo from "@/assets/main-logo.svg";
import { FlexBox } from "../layout/FlexBox";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function PageFooter() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const useLoggedOut = Boolean(user?.id == null);

  return (
    <footer
      className="
        relative w-full
        shadow-[0_2px_0_rgba(0,0,0,0.25),0_8px_24px_rgba(0,0,0,0.20)]
        overflow-hidden"
    >
      {/* Gradient background using theme colors */}
      <div className="relative z-0 w-full bg-gradient-to-r from-primary to-primary">
        {/* Diagonal darker wedge */}
        {useLoggedOut && (
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
        )}

        {/* Top section with logo, title, and action buttons */}
        <FlexBox
          className="z-10 items-center md:justify-between p-4 lg:px-20 md:py-10"
          firstColWidth="40"
          secondColWidth="30"
          orientation="column"
          rotational
        >
          {/* Left: logo + title */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="p-0 h-auto"
          >
            <FlexBox
              orientation="column"
              rotational
              className="gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:items-start"
            >
              <div className="relative shrink-0 overflow-hidden rounded-sm bg-white/10 h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20">
                <img src={mainLogo} alt="KRS Logo" className="object-cover" />
              </div>
              <div>
                <h3 className="font-extrabold text-white drop-shadow-sm text-center md:text-left">
                  સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ <br />
                  વડોદરા
                </h3>
                <FlexBox
                  orientation="row"
                  className="social_links mt-2 justify-center md:justify-start"
                >
                  <a
                    href="https://www.facebook.com/krs.vadodara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm md:text-base font-medium"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://www.instagram.com/krs_vadodara/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm md:text-base font-medium"
                  >
                    <InstagramIcon />
                  </a>
                </FlexBox>
              </div>
            </FlexBox>
          </Button>
          <div className="text-center md:text-right text-white/90 text-sm w-full md:w-auto">
            <p className="mb-3 sm:mb-4 md:mb-6">
              Copyright © 2025 Shri Saurastra Karadiya Rajut Samaj, Vadodara.
              All Rights Reserved
            </p>
            <p>
              Made with{" "}
              <HeartIcon className="h-10 w-10 inline p-1.5 sm:p-2 mx-1 bg-secondary/90 rounded-3xl sm:rounded-4xl" />{" "}
              in India
            </p>
          </div>
        </FlexBox>
      </div>
    </footer>
  );
}
