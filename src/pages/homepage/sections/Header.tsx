import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/common/Container";
import { useNavigate } from "react-router";

export function MainHeader() {
  const navigate = useNavigate();

  return (
    <Container as="section" className="main_header">
      <Button onClick={() => navigate("/login")} variant="ghost">
        Login as member
      </Button>
    </Container>
  );
}
