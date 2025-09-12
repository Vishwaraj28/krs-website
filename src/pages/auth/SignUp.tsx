// import { Flame } from "lucide-react";
import { SignupForm } from "@/components/blocks/auth/SignUp";
import { PageHeader } from "@/components/blocks/common/PageHeader";

export default function SignupPage() {
  return (
    <>
      <PageHeader />
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10 bg-background">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignupForm className="items-start" />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-gradient-to-br from-secondary via-primary to-accent lg:block">
          <div className="absolute inset-0 bg-black/20" />
          <img
            src="/placeholder.svg?height=800&width=600"
            alt="Signup background"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative z-10 flex h-full items-center justify-center p-8">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg opacity-90">
                Create an account to get started and access all our features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
