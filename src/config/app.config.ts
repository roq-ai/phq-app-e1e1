interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Healthcare Provider'],
  tenantName: 'Organization',
  applicationName: 'Phq app',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage account',
    'Fill out phq 9 questions and track medication',
    'View personal phq 9 question answers graphically over time',
    'Delete account',
  ],
  ownerAbilities: [
    "Manage Organization's information",
    'Log in to the application',
    'Invite Healthcare Providers',
    'Manage access rights of Healthcare Providers',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/14f9680b-ef96-4573-8349-0a71326a058f',
};
