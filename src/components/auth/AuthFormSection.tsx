import { Card, CardBody } from "@heroui/react";
import { Link } from "react-router-dom";

import { AuthFormSectionProps } from "@/types/auth";

const AuthFormSection = ({
  title,
  subtitle,
  children,
}: AuthFormSectionProps) => {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border border-slate-200">
          <CardBody className="p-6">
            {" "}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                {title}
              </h2>
              <p className="text-slate-600 text-sm">{subtitle}</p>
            </div>
            <div className="space-y-4">{children}</div>
          </CardBody>
        </Card>
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-slate-500">
            © 2025 Valle de Aburra - Secretaría del Medio Ambiente
          </p>
          <div className="flex justify-center space-x-4 text-xs">
            <Link className="text-slate-500 hover:text-slate-700" to="#">
              Política de Datos
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="text-slate-500 hover:text-slate-700" to="#">
              Soporte Técnico
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="text-slate-500 hover:text-slate-700" to="#">
              Manual de Usuario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFormSection;
