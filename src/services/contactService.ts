import { ContactFormData } from '../types/contact';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export async function submitContactMessage(formData: ContactFormData): Promise<{ success: boolean; message?: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'af11a3ee-1da5-4932-8919-ac91af68bd33';

  if (!accessKey || accessKey.trim() === '') {
    throw new Error('Chave de acesso não configurada');
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
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

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Falha ao enviar mensagem');
  }

  return { success: true };
}
