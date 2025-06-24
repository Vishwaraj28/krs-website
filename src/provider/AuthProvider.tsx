// AuthProvider.tsx
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sessionThunk } from "@/store/thunk/sessionThunk";
import type { AppDispatch } from "@/store/store";
// import { useNavigate } from "react-router"; // optionally handle redirect here

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const result = await dispatch(sessionThunk());

      if (sessionThunk.rejected.match(result)) {
        // navigate("/login"); // optional
      }
    };

    init();
  }, [dispatch]);

  return <>{children}</>;
};
