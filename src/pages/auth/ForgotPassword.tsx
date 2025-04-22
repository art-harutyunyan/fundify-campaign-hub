
import { MainLayout } from "@/components/layout/MainLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <ForgotPasswordForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
