const mainUrl = 'http://localhost:8085';

export const environment = {
  MAIN_URL: mainUrl,
  TICKET_URL: `${mainUrl}/tickets`,
  AUTH_URL: `${mainUrl}/auth`,
  AUTH_ADMIN_URL: `${mainUrl}/admin`,
  CHARTS_URL: `${mainUrl}/tickets`,
  EMAIL_GROUPS_URL: `${mainUrl}/admin/emails`,
};
