// components/ProfileHeader.tsx
import { Avatar, Card, CardBody } from "@heroui/react";
import { IconMail } from "@tabler/icons-react";

interface ProfileHeaderProps {
  userEmail?: string;
}

export const ProfileHeader = ({ userEmail }: ProfileHeaderProps) => {
  return (
    <Card className="shadow-lg border border-gray-200">
      <CardBody className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <Avatar
            isBordered
            className="ring-2 ring-primary-200"
            size="lg"
            src="https://i.pravatar.cc/150?img=44"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Perfil de Usuario
            </h1>
            <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 text-sm md:text-base">
              <IconMail size={16} />
              {userEmail}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
