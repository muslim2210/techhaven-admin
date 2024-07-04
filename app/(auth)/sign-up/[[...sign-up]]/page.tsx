import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-500">
      <SignUp />
    </div>
  );
}
