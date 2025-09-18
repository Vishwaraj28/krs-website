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
            className="absolute inset-y-0 left-0 z-0"
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
          className="z-10 justify-between px-20 py-10"
          firstColWidth="40"
          secondColWidth="30"
        >
          {/* Left: logo + title */}
          <Button variant="ghost" onClick={() => navigate("/")} className="p-0">
            <FlexBox className="gap-5 md:gap-6 items-start">
              <div className="relative shrink-0 overflow-hidden rounded-sm bg-white/10 h-16 w-16 md:h-20 md:w-20">
                <img src={mainLogo} alt="KRS Logo" className="object-cover" />
              </div>
              <div>
                <h3 className="font-extrabold text-white drop-shadow-sm text-left">
                  સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ <br />
                  વડોદરા
                </h3>
                <div className="social_links mt-2 flex gap-4">
                  <a
                    href="https://www.facebook.com/krs.vadodara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm md:text-base font-medium"
                  >
                    <FacebookIcon className="" />
                  </a>
                  <a
                    href="https://www.instagram.com/krs_vadodara/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm md:text-base font-medium"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </FlexBox>
          </Button>
          <div className="text-right text-white/90 text-sm">
            <p className="mb-6">
              Copyright © 2024 Shri Saurastra Karadiya Rajut Samaj, Vadodara.
              All Rights Reserved
            </p>
            <p>
              Made with{" "}
              <HeartIcon className="h-10 w-10 inline p-2 mx-1 bg-secondary/90 rounded-4xl" />{" "}
              in India
            </p>
          </div>
        </FlexBox>
      </div>
    </footer>
  );
}
