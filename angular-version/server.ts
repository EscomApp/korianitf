import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import nodemailer from 'nodemailer';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(express.json());

  // Rate limiting store
  const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

  // Contact API endpoint
  server.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const ip = req.ip || req.socket.remoteAddress || 'unknown';

      // Rate limiting
      const now = Date.now();
      const rateLimit = rateLimitStore.get(ip);
      
      if (rateLimit) {
        if (now < rateLimit.resetTime) {
          if (rateLimit.count >= 3) {
            return res.status(429).json({ error: 'Too many requests. Please try again later.' });
          }
          rateLimit.count++;
        } else {
          rateLimitStore.set(ip, { count: 1, resetTime: now + 3600000 });
        }
      } else {
        rateLimitStore.set(ip, { count: 1, resetTime: now + 3600000 });
      }

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      if (message.length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters' });
      }

      // Send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env['EMAIL_USER'],
          pass: process.env['EMAIL_PASS']
        }
      });

      await transporter.sendMail({
        from: process.env['EMAIL_USER'],
        to: process.env['EMAIL_USER'],
        replyTo: email,
        subject: `Contact Form: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });

      res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

  // Serve static files
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Angular Universal
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
