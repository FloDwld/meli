import { Sites } from '../entities/sites/site';
import { env } from '../env/env';
import { generateSiteRoutes } from './config/sites/generate-site-routes';
import { getErrorRoutes } from './config/get-error-routes';
import { generateManualCertificatesConfig, generateServerTlsConfig } from './config/ssl';
import { uiRoute } from './config/ui-route';
import { apiRoute } from './config/api-route';
import { URL } from 'url';
import { fallback } from './config/fallback';
import { Logger } from '../commons/logger/logger';

const logger = new Logger('meli.api.caddy:generateConfig');

const sitesUrl = new URL(env.MELI_SITES_URL);

export async function generateConfig(): Promise<Caddy.Root> {
  const sites = await Sites().find().toArray();

  const sslEnabled = sitesUrl.protocol === 'https:' && env.MELI_HTTPS_AUTO;

  logger.debug('sslEnabled', sslEnabled);

  return {
    logging: {
      logs: {
        default: {
          level: 'DEBUG',
        },
      },
    },
    admin: {
      disabled: false,
      listen: '0.0.0.0:2019',
    },
    apps: {
      http: {
        servers: {
          sites: {
            listen: sslEnabled ? [':443'] : [':80'],
            routes: [
              ...(env.MELI_STANDALONE ? [] : [
                apiRoute,
                uiRoute,
              ]),
              ...sites.flatMap(generateSiteRoutes),
              fallback,
            ],
            errors: getErrorRoutes(),
            ...(sslEnabled ? generateServerTlsConfig(sites) : {}),
          },
        },
      },
      tls: sslEnabled ? {
        automation: {
          policies: [{
              issuers: [{
                module: 'acme',
                challenges: {
                  dns: {
                    provider: {
                      name: 'route53',
                      max_retries: 3,
                    }
                  }
                }
              }]
            }
          ],
        },
        certificates: generateManualCertificatesConfig(sites),
      } : undefined,
    },
  };
}
