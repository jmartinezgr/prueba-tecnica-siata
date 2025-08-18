export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SIMET",
  description: "Sistema de Monitoreo de Estaciones",
  privateNavItems: [
    {
      label: "Estaciones",
      href: "/estaciones",
    },
    {
      label: "Perfil",
      href: "/perfil",
    },
  ],
  publicNavItems: [],

  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
