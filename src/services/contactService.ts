import { ContactFormData } from '../types/contact';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** Motivo da falha, traduzido na interface por `contact.errors.<code>`. */
export type ContactErrorCode = 'not_configured' | 'network' | 'rejected';

export class ContactError extends Error {
  constructor(public readonly code: ContactErrorCode, detail?: string) {
    super(detail ?? code);
    this.name = 'ContactError';
  }
}

export async function submitContactMessage(formData: ContactFormData): Promise<void> {
  // A chave vem só do ambiente (.env local ou variáveis da Vercel), nunca do código.
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    throw new ContactError('not_configured');
  }

  let response: Response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: `Novo Contato do Portfólio de: ${formData.name}`,
        from_name: 'Studio Filipi Soares',
      }),
    });
  } catch {
    throw new ContactError('network');
  }

  const data: { success?: boolean; message?: string } = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new ContactError('rejected', data.message);
  }
}
