import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/common/Container";

export function MainHeader() {
  return (
    <Container as="section" className="main_header">
      <Button variant="ghost">Login as member</Button>
    </Container>
  );
}
