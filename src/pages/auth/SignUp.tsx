
import { MainLayout } from "@/components/layout/MainLayout";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <SignUpForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default SignUp;
