import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/hooks/useAuth";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { usePasswordVisibility } from "@/hooks/profile/usePasswordVisibility";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PersonalInfoForm } from "@/components/profile/PersonalInfoForm";
import { SecurityForm } from "@/components/profile/SecurityForm";
import { ProfileActions } from "@/components/profile/ProfileActions";

const ProfilePage = () => {
  const { user } = useAuth();
  const {
    formData,
    errors,
    touched,
    isFormValid,
    isLoading,
    handleInputChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useProfileForm();

  const { showPasswords, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <DefaultLayout>
      <div className="w-full space-y-4 md:space-y-6 py-4">
        <div className="mx-auto space-y-4 md:space-y-6 w-full">
          {/* Header Card */}
          <ProfileHeader userEmail={user?.email} />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            {/* Personal Information Card */}
            <PersonalInfoForm
              errors={{
                firstName: errors.firstName,
                lastName: errors.lastName,
                email: errors.email,
              }}
              formData={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
              }}
              touched={touched}
              onBlur={handleBlur}
              onInputChange={handleInputChange}
            />

            {/* Security Card */}
            <SecurityForm
              errors={{
                currentPassword: errors.currentPassword,
                newPassword: errors.newPassword,
                confirmPassword: errors.confirmPassword,
              }}
              formData={{
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
              }}
              showPasswords={showPasswords}
              touched={touched}
              onBlur={handleBlur}
              onInputChange={handleInputChange}
              onTogglePasswordVisibility={togglePasswordVisibility}
            />
          </div>

          {/* Action Buttons */}
          <ProfileActions
            isFormValid={isFormValid}
            isLoading={isLoading}
            onReset={handleReset}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
