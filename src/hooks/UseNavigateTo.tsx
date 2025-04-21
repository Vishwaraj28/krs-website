import { useNavigate } from "react-router";

const useNavigateTo = (href: string) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(href);
  };

  return navigateTo;
};

export default useNavigateTo;
