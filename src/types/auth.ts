export type AuthInfoPanelProps = {
  title: string;
  subtitle: string;
  descList: AuthInfoPanelListItem[];
};

export type AuthInfoPanelListItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export type AuthFormSectionProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};
