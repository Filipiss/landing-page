import { useState, ChangeEvent, FormEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ArrowUpRight, Check, AlertCircle, Copy } from 'lucide-react';
import './ContactSection.css';

interface ContactSectionProps {
    onOpenCvModal?: () => void;
}

export default function ContactSection({ onOpenCvModal }: ContactSectionProps = {}) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status !== 'idle' && status !== 'sending') {
            setStatus('idle');
        }
    };

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText('filipi.soares.silva@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'af11a3ee-1da5-4932-8919-ac91af68bd33';

        if (accessKey && accessKey.trim() !== '') {
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: accessKey,
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        subject: `Novo Contato do Portfólio de: ${formData.name}`,
                        from_name: 'Studio Filipi Soares'
                    })
                });

                const data = await response.json();

                if (data.success) {
                    setStatus('success');
                    setFormData({ name: '', email: '', message: '' });
                } else {
                    setStatus('error');
                    setErrorMessage(data.message || t('contact.error'));
                }
            } catch (err) {
                console.error('Erro ao enviar mensagem:', err);
                setStatus('error');
                setErrorMessage(t('contact.error'));
            }
        } else {
            setTimeout(() => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            }, 750);
        }
    };

    return (
        <section id="contact" className="section studio-contact-section">
            <div className="container">
                {/* 1. Kicker */}
                <div className="section-kicker">
                    <span className="section-kicker-num">05 //</span>
                    <span>{t('contact.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
                </div>

                <div className="studio-contact-layout">
                    {/* Left: Direct Channels & Studio Pitch */}
                    <div className="studio-contact-pitch-col">
                        <h2 className="contact-monumental-headline font-display">
                            {t('contact.title')}
                        </h2>
                        <p className="contact-manifesto-sub">
                            {t('contact.subtitle')}
                        </p>

                        <div className="studio-channels-list">
                            {/* Email row with Copy button */}
                            <div className="studio-channel-row font-mono">
                                <span className="channel-tag">{t('contact.email_label')} //</span>
                                <a href="mailto:filipi.soares.silva@gmail.com" className="channel-value-link">
                                    filipi.soares.silva@gmail.com
                                </a>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="channel-copy-btn"
                                    title="Copiar email"
                                >
                                    {copiedEmail ? (
                                        <>
                                            <Check size={12} className="copy-icon-success" />
                                            <span>{t('contact.email_copied')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={12} />
                                            <span>{t('contact.copy_email')}</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* GitHub */}
                            <a
                                href="https://github.com/filipiss"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="studio-channel-row font-mono"
                            >
                                <span className="channel-tag">{t('contact.github_label')} //</span>
                                <span className="channel-value-link">github.com/filipiss</span>
                                <ArrowUpRight size={14} className="kinetic-arrow channel-arrow" />
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/filipiss/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="studio-channel-row font-mono"
                            >
                                <span className="channel-tag">{t('contact.linkedin_label')} //</span>
                                <span className="channel-value-link">linkedin.com/in/filipiss</span>
                                <ArrowUpRight size={14} className="kinetic-arrow channel-arrow" />
                            </a>

                            {/* CV Download */}
                            <button
                                type="button"
                                onClick={onOpenCvModal}
                                className="studio-channel-row studio-channel-btn font-mono"
                                title={t('cv_modal.title')}
                            >
                                <span className="channel-tag">{t('contact.cv_label')} //</span>
                                <span className="channel-value-link">DOWNLOAD CURRÍCULO ↗</span>
                                <ArrowUpRight size={14} className="kinetic-arrow channel-arrow" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Integrated Flat Transmission Form */}
                    <div className="studio-contact-form-col">
                        <div className="studio-form-card">
                            <form onSubmit={handleFormSubmit} className="studio-transmission-form">
                                <div className="form-input-group">
                                    <label htmlFor="form-name" className="form-field-label font-mono">
                                        {t('contact.label_name')}
                                    </label>
                                    <input
                                        id="form-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.placeholder_name')}
                                        required
                                        className="form-editorial-input"
                                    />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="form-email" className="form-field-label font-mono">
                                        {t('contact.label_email')}
                                    </label>
                                    <input
                                        id="form-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.placeholder_email')}
                                        required
                                        className="form-editorial-input"
                                    />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="form-message" className="form-field-label font-mono">
                                        {t('contact.label_message')}
                                    </label>
                                    <textarea
                                        id="form-message"
                                        name="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.placeholder_message')}
                                        required
                                        className="form-editorial-textarea"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary form-submit-btn font-mono"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? (
                                        <span>{t('contact.sending')}</span>
                                    ) : (
                                        <>
                                            <span>{t('contact.send_btn')}</span>
                                            <ArrowUpRight size={14} className="kinetic-arrow" />
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <div className="form-feedback-strip feedback-success font-mono">
                                        <Check size={14} />
                                        <span>{t('contact.success')}</span>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="form-feedback-strip feedback-error font-mono">
                                        <AlertCircle size={14} />
                                        <span>{errorMessage || t('contact.error')}</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
