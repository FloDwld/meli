import { parseEnv } from '../commons/env/parse-env';
import { Logger } from '../commons/logger/logger';
import { envSpec } from './env-spec';
import { MulterLimitOptions } from '../commons/multer/types';

export interface Env {
  DEBUG: string;
  MELI_PORT: number;
  MELI_URL: string;
  MELI_URL_INTERNAL: string;
  MELI_UI_URL: string;
  MELI_UI_URL_INTERNAL: string;
  MELI_SITES_URL: string;
  MELI_HTTPS_AUTO: string;
  MELI_STANDALONE: boolean;
  MELI_UI_DIR: string;
  MELI_JWT_SECRET: string;
  MELI_JWT_TOKEN_EXPIRATION: number;
  MELI_MONGO_URI: string;
  MELI_GITLAB_URL: string;
  MELI_GITLAB_CLIENT_ID: string;
  MELI_GITLAB_CLIENT_SECRET: string;
  MELI_GITLAB_GROUPS: string[];
  MELI_GITEA_URL: string;
  MELI_GITEA_CLIENT_ID: string;
  MELI_GITEA_CLIENT_SECRET: string;
  MELI_GITEA_ORGS: string[];
  MELI_GITHUB_URL: string;
  MELI_GITHUB_CLIENT_ID: string;
  MELI_GITHUB_CLIENT_SECRET: string;
  MELI_GITHUB_ORGS: string[];
  MELI_GOOGLE_CLIENT_ID: string;
  MELI_GOOGLE_CLIENT_SECRET: string;
  MELI_MIGRATE_ROLLBACK: boolean;
  MELI_COOKIE_SAMESITE: boolean;
  MELI_COOKIE_SECURE: boolean;
  MELI_RATE_LIMIT_WINDOW: number;
  MELI_RATE_LIMIT_MAX_PER_WINDOW: number;
  MELI_PROMETHEUS_HOST: string;
  MELI_PROMETHEUS_PORT: number;
  MELI_PROMETHEUS_REFRESH_RATE: number;
  MELI_PROMETHEUS_METRICS_PREFIX: string;
  MELI_REDIS_URL: string;
  MELI_HOOK_TIMEOUT: number;
  MELI_MAIL_HOST: string;
  MELI_MAIL_PORT: number;
  MELI_MAIL_USERNAME: number;
  MELI_MAIL_PASSWORD: number;
  MELI_MAIL_FROM: string;
  MELI_MAIL_TEMPLATE_DIR: string;
  MELI_MAIL_SUBJECT_PREFIX: string;
  MELI_SENTRY_ENABLED: boolean;
  MELI_RESTRICTED_IPS: string[];
  MELI_RESTRICTED_DOMAINS: string[];
  MELI_CADDY_ADMIN_API_URL: string;
  // Caddy content path
  MELI_CADDY_DIR: string;
  MELI_TMP_DIRECTORY: string;
  MELI_SITES_DIR: string;
  MELI_STORAGE_DIR: string;
  MELI_INVITE_EXPIRATION_TIME: number;
  MELI_ACME_SERVER: string;
  MELI_ACME_CA_PATH: string;
  MELI_HTTP_TIMEOUT: number;
  MELI_USER: string;
  MELI_PASSWORD: string;
  MELI_MAX_ORGS: number;
  MELI_MULTER_LIMITS: MulterLimitOptions;
  MELI_MULTER_FORM_LIMITS: MulterLimitOptions;
  MELI_GOOGLE_RECAPTCHA_SITE_KEY: string;
  MELI_GOOGLE_RECAPTCHA_SECRET_KEY: string;
}

export const env: Env = parseEnv(envSpec);

const logger = new Logger('meli.api:env');
logger.debug('loaded env', env);
