import { FastifyReply, FastifyRequest } from 'fastify';
import { emailService } from './email.service';
import { sendEmailSchema, SendEmailInput, sendResetPasswordSchema, SendResetPasswordInput } from './email.schema';
import { supabaseAdmin } from '../../config/supabase';

export async function sendEmailHandler(
  request: FastifyRequest<{ Body: SendEmailInput }>,
  reply: FastifyReply
) {
  try {
    // Manual validation
    const body = sendEmailSchema.parse(request.body);
    const { to, subject, html, text } = body;

    const info = await emailService.sendEmail(to, subject, html, text);
    return reply.code(200).send({ success: true, messageId: info.messageId });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.code(400).send({ 
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
        details: error.errors 
      });
    }
    
    request.log.error({ error }, 'Failed to send email');
    return reply.code(500).send({ message: 'Failed to send email', error: error.message });
  }
}

export async function sendResetPasswordHandler(
  request: FastifyRequest<{ Body: SendResetPasswordInput }>,
  reply: FastifyReply
) {
  try {
    request.log.info({ 
      body: request.body, 
      url: request.url, 
      headers: request.headers 
    }, 'Processing password reset request');

    const rawBody = request.body;
    // Trim string inputs to avoid validation/processing errors
    const email = rawBody.email.trim();
    const redirectTo = rawBody.redirectTo?.trim();

    // Re-validate with trimmed values
    sendResetPasswordSchema.parse({ email, redirectTo });

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: redirectTo
      }
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
        request.log.warn({ email }, 'User not found during password reset request');
        return reply.code(404).send({ message: 'User not found' });
    }

    const resetLink = data.properties.action_link;
    request.log.info({ email }, 'Generated password reset link');
    
    // Nice HTML template
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a1a; font-size: 24px; font-weight: bold;">Reset Your Password</h1>
          <p style="color: #666666; font-size: 16px;">We received a request to reset your password for your Ezri account.</p>
        </div>
        
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 30px; text-align: center; margin-bottom: 30px;">
          <p style="margin-bottom: 20px; color: #4a5568;">Click the button below to set a new password:</p>
          <a href="${resetLink}" style="display: inline-block; background-color: #7c3aed; color: white; font-weight: 600; padding: 12px 24px; text-decoration: none; border-radius: 6px; box-shadow: 0 4px 6px rgba(124, 58, 237, 0.2);">Reset Password</a>
          <p style="margin-top: 20px; font-size: 14px; color: #718096;">Or copy and paste this link into your browser:</p>
          <p style="font-size: 12px; color: #a0aec0; word-break: break-all;">${resetLink}</p>
        </div>
        
        <div style="text-align: center; font-size: 14px; color: #a0aec0;">
          <p>If you didn't request a password reset, you can safely ignore this email. This link will expire in 1 hour.</p>
          <p>&copy; ${new Date().getFullYear()} Ezri Health. All rights reserved.</p>
        </div>
      </div>
    `;

    const subject = 'Reset Your Password - Ezri';
    
    await emailService.sendEmail(email, subject, html);
    
    request.log.info({ email }, 'Password reset email sent successfully');
    return reply.code(200).send({ success: true, message: 'Password reset email sent successfully' });

  } catch (error: any) {
    if (error.name === 'ZodError') {
       return reply.code(400).send({ 
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
        details: error.errors 
      });
    }

    // Check for specific Supabase errors
    if (error.status === 429) {
      return reply.code(429).send({ message: 'Too many requests. Please try again later.' });
    }

    request.log.error({ error, message: error.message, stack: error.stack }, 'Failed to process reset password');
    return reply.code(500).send({ message: 'Failed to process request', error: error.message });
  }
}
