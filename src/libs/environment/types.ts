export interface Environment {
  PCM_API_BASE_URL: string | undefined
  ACCESSIBILITY_LINK: string
  ALGOLIA_APPLICATION_ID: string
  ALGOLIA_OFFERS_INDEX_NAME: string
  ALGOLIA_SEARCH_API_KEY: string
  ALGOLIA_VENUE_OFFERS_INDEX_NAME: string
  ALGOLIA_VENUES_INDEX_NAME: string
  ALGOLIA_SUGGESTIONS_INDEX_NAME: string
  AMPLITUDE_API_KEY?: string
  ANDROID_APP_ID: string
  API_BASE_URL: string
  APPLE_STORE_URL: string
  APPS_FLYER_DEV_KEY: string
  BOOKING_LIMIT_EXCEEDED_URL: string
  CGU_LINK: string
  CONTENTFUL_ACCESS_TOKEN: string
  CONTENTFUL_ENVIRONMENT: string
  CONTENTFUL_SPACE_ID: string
  COOKIES_POLICY_LINK: string
  CULTURAL_SURVEY_TYPEFORM_ID: string
  DATA_PRIVACY_CHART_LINK: string
  DOC_CGU_URL: string
  DOC_PERSONAL_DATA_URL: string
  DSM_URL: string
  DMS_FRENCH_CITIZEN_URL: string
  DMS_FOREIGN_CITIZEN_URL: string
  EDUCONNECT_ALLOWED_DOMAIN: string
  ENABLE_WHY_DID_YOU_RENDER: boolean
  ENV: string
  FAQ_LINK: string
  FAQ_LINK_CREDIT: string
  FAQ_LINK_DELETE_ACCOUNT: string
  FAQ_LINK_EDUCONNECT_URL: string
  FAQ_LINK_LEGAL_GUARDIAN: string
  FAQ_LINK_PERSONAL_DATA: string
  FAQ_LINK_RESET_PASSORD_EMAIL_NOT_RECEIVED: string
  FAQ_LINK_SIGNUP_CONFIRMATION_EMAIL_NOT_RECEIVED: string
  FEATURE_FLIPPING_ONLY_VISIBLE_ON_TESTING: boolean
  FIREBASE_APIKEY: string
  FIREBASE_APPID: string
  FIREBASE_AUTHDOMAIN: string
  FIREBASE_DYNAMIC_LINK_DOMAIN: string
  FIREBASE_MESSAGINGSENDERID: string
  FIREBASE_PROJECTID: string
  FIREBASE_STORAGEBUCKET: string
  GCP_IMAGE_COULD_STORAGE_NAME: string
  GOOGLE_PLAY_STORE_URL: string
  IOS_APP_ID: string
  IOS_APP_STORE_ID: string
  PASSCULTURE_DOWNLOAD_APP_URL: string
  PRIVACY_POLICY_LINK: string
  PUBLIC_URL: string
  RECOMMENDATION_ENDPOINT: string
  RECOMMENDATION_TOKEN: string
  RESIZE_IMAGE_ON_DEMAND_URL: string
  SENTRY_DSN: string
  SIGNIN_IDENTIFIER: string
  SIGNIN_PASSWORD: string
  SIGNUP_POSTAL_CODE: string
  SITE_KEY: string
  SUPPORT_EMAIL_ADDRESS: string
  FRAUD_EMAIL_ADDRESS: string
  URL_PREFIX: string
  WEBAPP_V2_DOMAIN: string
  // Below envs are injected by webpack and are defined only on the Webapp
  COMMIT_HASH: string
  BRANCH: string
  LAST_COMMIT_DATETIME: string
}
