import SignInButton from "@/components/ui/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">Sign in to access your Service</h2>

      <SignInButton />
    </div>
  );
}
