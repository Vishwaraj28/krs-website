import type { FormConfig } from "@/types/form-types";
import { Container } from "@/components/blocks/layout/Container";
import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicForm } from "@/components/blocks/form/DynamicForm";

export function JoinUsSection() {
  const formConfig: FormConfig = {
    id: "join-us-form",
    fields: ["fullName*", "phone*", "address*", "nativeAddress*"],
    language: "gu", // Explicitly set English language
    submitButtonText: "Submit",
    onSubmitSuccess: (data) => {
      console.log("Form submitted successfully:", data);
      // You can add additional logic here, like API calls
    },
  };
  return (
    <Container
      // wide
      as="section"
      className="relative bg-[#FFE1BA] py-10 md:py-12 pb-12 md:pb-16 joinus_container rounded-3xl md:rounded-4xl mt-16 md:mt-24 mb-12 md:mb-16 shadow-md px-6 w-[95%] md:w-full"
      id="joinus"
    >
      <div className="absolute inset-0 opacity-25 z-0 bg-primary-gradient rounded-3xl md:rounded-4xl" />
      <h1 className="mb-8 md:mb-12 :px-3 relative text-center z-1">Join us</h1>
      <FlexBox
        firstColWidth="50"
        secondColWidth="50"
        className="px-0 md:px-12 lg:px-18 gap-8 md:gap-10 lg:gap-14 z-1 relative items-start"
        orientation="column"
        rotational
      >
        <Card className="w-full shadow-lg border-none rounded-2xl">
          <CardContent className="p-5 md:p-6">
            <DynamicForm config={formConfig} />
          </CardContent>
        </Card>
        <div className="right-container">
          <h4 className="mb-3">આગામી ઇવેન્ટ અથવા મીટિંગ વિશે વિગતો</h4>
          <p className="mb-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            esse cumque minima vero exercitationem reiciendis sed nam. Atque,
            magni nobis blanditiis possimus magnam quos praesentium ipsum
            laudantium consequatur ad iusto!
          </p>
          <p className="mb-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            esse cumque minima vero exercitationem reiciendis sed nam. Atque,
            magni nobis blanditiis possimus magnam quos praesentium ipsum
            laudantium consequatur ad iusto!
          </p>
          <p className="mb-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            esse cumque minima vero exercitationem reiciendis sed nam. Atque,
            magni nobis blanditiis possimus magnam quos praesentium ipsum
            laudantium consequatur ad iusto!
          </p>
        </div>
      </FlexBox>
    </Container>
  );
}
