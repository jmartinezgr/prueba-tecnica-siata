import { IconCloud } from "@tabler/icons-react";

import { AuthInfoPanelProps } from "@/types/auth";
import { siteConfig } from "@/config/site";

const AuthInfoPanel = ({ title, subtitle, descList }: AuthInfoPanelProps) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 relative overflow-hidden">
      <div className="relative z-10 p-12 text-white flex flex-col justify-center">
        {/* Titulos */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-white/20 p-3 rounded-lg mr-4">
              <IconCloud />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
              <p className="text-slate-200">
                Sistema de Información Meteorológica
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-90 mb-6">{subtitle}</p>
        </div>
        {/* Contenido */}
        <div className="space-y-6">
          {descList.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-slate-200 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Información de Contacto */}
        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
          <h4 className="font-semibold mb-3">Soporte Técnico</h4>
          <div className="text-sm text-slate-200 space-y-1">
            <p>📧 soporte.simet@antioquia.gov.co</p>
            <p>📞 (604) 385-5555 Ext. 1234</p>
            <p>🕒 Lunes a Viernes: 8:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthInfoPanel;
