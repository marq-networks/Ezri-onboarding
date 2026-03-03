import { FastifyInstance } from 'fastify';
import { sendEmailHandler, sendResetPasswordHandler } from './email.controller';

export async function emailRoutes(fastify: FastifyInstance) {
  fastify.log.info('Registering email routes...');

  try {
    fastify.get('/health', async () => ({ status: 'ok', service: 'email' }));

    fastify.post(
      '/send',
      {
        // Using manual validation in controller to avoid fastify-type-provider-zod "reading 'run'" error
        preHandler: [fastify.authenticate],
      },
      sendEmailHandler
    );

    fastify.post(
      '/reset-password',
      // No auth required as user can't login if they forgot password
      sendResetPasswordHandler
    );
    
    fastify.log.info('Email routes registered successfully');
  } catch (error) {
    fastify.log.error(error, 'Failed to register email routes');
    throw error;
  }
}
