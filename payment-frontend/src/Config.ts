export const Config = {
  PAYMENT_BACKEND_URL: process.env.REACT_APP_PAYMENT_BACKEND_URL || 'http://payment.backend.apps.test-openshift.benoit.sattamax.com',
  CATALOG_FRONTEND_BASE_URL: process.env.REACT_APP_CATALOG_FRONTEND_BASE_URL || 'http://catalog.frontend.apps.test-openshift.benoit.sattamax.com',
  CATALOG_BACKEND_BASE_URL: process.env.REACT_APP_CATALOG_BACKEND_BASE_URL || 'http://catalog.backend.apps.test-openshift.benoit.sattamax.com',
}