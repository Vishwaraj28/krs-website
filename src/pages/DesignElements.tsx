import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function DesignElements() {
  return (
    <>
      <main className="min-h-screen p-8">
        <div className="container mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1>Website theme</h1>
            {/* <ThemeToggle /> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-4">
              <h2>Typography</h2>
              <div className="space-y-2">
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <p>Regular paragraph text</p>
              </div>

              <h2 className="mt-6">Gujarati Typography</h2>
              <div className="space-y-2">
                <h1 className="guj-h1">સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ</h1>
                <h2 className="guj-h2">સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ</h2>
                <h3 className="guj-h3">સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ</h3>
                <h4 className="guj-h4">સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ</h4>
                <p className="guj-p">સૌરાષ્ટ્ર કારડીયા રાજપૂત સમાજ</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2>Colors & Components</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary rounded-md text-primary-foreground">
                  Primary
                </div>
                <div className="p-4 bg-primary-dark rounded-md text-white">
                  Primary Dark
                </div>
                <div className="p-4 bg-primary-light rounded-md text-primary-dark">
                  Primary Light
                </div>
                <div className="p-4 bg-primary-alt rounded-md text-white">
                  Primary Alt
                </div>
                <div className="p-4 bg-secondary rounded-md text-white">
                  Secondary
                </div>
                <div className="p-4 bg-secondary-alt rounded-md text-white">
                  Secondary Alt
                </div>
                <div className="p-4 bg-default rounded-md text-white">
                  Default
                </div>
                <div className="p-4 bg-default-light rounded-md text-default">
                  Default Light
                </div>
                <div className="p-4 bg-primary-gradient rounded-md text-white">
                  Primary Gradient
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex flex-wrap gap-2">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>
                      Card description goes here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content and information displayed here.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit</Button>
                  </CardFooter>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default DesignElements;
