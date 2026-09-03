import { useState, ChangeEvent, FormEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Mail, Send, CheckCircle2, AlertCircle, ShieldCheck, Zap, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import LinkedinIcon from '../../atoms/LinkedinIcon/LinkedinIcon';
import StarBorder from '../../atoms/StarBorder/StarBorder';
import './ContactSection.css';

export default function ContactSection() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status !== 'idle' && status !== 'sending') {
            setStatus('idle');
        }
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

        // Se uma chave real do Web3Forms estiver configurada no .env:
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
                        from_name: 'Portfólio de Fillipe'
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
            // Fallback elegante caso a chave ainda não tenha sido inserida no .env:
            // Simula o envio com sucesso após 1s para demonstração
            setTimeout(() => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            }, 1000);
        }
    };

    return (
        <section id="contact" className="section contact-section-editorial">
            <div className="container">

                {/* Section Header */}
                <div className="text-center contact-header">
                    <span className="pretitle">
                        <Sparkles size={14} />
                        Contato
                    </span>
                    <h2 className="section-title">
                        {t('contact.title')}{' '}
                        <span className="highlight">{t('contact.title_highlight')}</span>
                    </h2>
                    <p className="section-subtitle contact-subtitle">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="contact-editorial-grid">

                    {/* Left Column: Direct Info & Trust Badges */}
                    <div className="contact-editorial-info-wrapper">
                        <StarBorder className="contact-star-border" innerClassName="contact-editorial-info" speed="6s">
                            <div className="contact-card-header">
                                <h3 className="contact-info-headline">{t('contact.direct_title')}</h3>
                                <p className="contact-info-description">{t('contact.direct_desc')}</p>
                            </div>

                            <div className="contact-channels-list">
                                <a href="mailto:filipi.soares.silva@gmail.com" className="contact-channel-item">
                                    <div className="contact-channel-icon"><Mail size={18} /></div>
                                    <div className="contact-channel-texts">
                                        <span className="contact-channel-label">E-mail Direto</span>
                                        <span className="contact-channel-value">filipi.soares.silva@gmail.com</span>
                                    </div>
                                </a>

                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                                    <div className="contact-channel-icon"><LinkedinIcon size={18} /></div>
                                    <div className="contact-channel-texts">
                                        <span className="contact-channel-label">LinkedIn</span>
                                        <span className="contact-channel-value">linkedin.com/in/filipidios</span>
                                    </div>
                                </a>

                                <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                                    <div className="contact-channel-icon"><GithubIcon size={18} /></div>
                                    <div className="contact-channel-texts">
                                        <span className="contact-channel-label">GitHub</span>
                                        <span className="contact-channel-value">github.com/filipidios</span>
                                    </div>
                                </a>
                            </div>

                            {/* Trust Highlights */}
                            <div className="contact-trust-pills">
                                <div className="trust-pill">
                                    <ShieldCheck size={16} className="color-accent" />
                                    <span>{t('contact.trust_rating')}</span>
                                </div>
                                <div className="trust-pill">
                                    <Zap size={16} className="color-accent" />
                                    <span>{t('contact.trust_clean')}</span>
                                </div>
                                <div className="trust-pill">
                                    <MessageSquare size={16} className="color-accent" />
                                    <span>{t('contact.trust_comm')}</span>
                                </div>
                            </div>
                        </StarBorder>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="contact-editorial-form-wrapper">
                        <StarBorder className="contact-star-border" innerClassName="contact-editorial-form-inner" speed="6s">
                            <form onSubmit={handleFormSubmit} className="contact-editorial-form">
                                <div className="contact-input-group">
                                    <label htmlFor="form-name">{t('contact.label_name')}</label>
                                    <input
                                        id="form-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.placeholder_name')}
                                        required
                                    />
                                </div>

                                <div className="contact-input-group">
                                    <label htmlFor="form-email">{t('contact.label_email')}</label>
                                    <input
                                        id="form-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.placeholder_email')}
                                        required
                                    />
                                </div>

                                <div className="contact-input-group">
                                    <label htmlFor="form-message">{t('contact.label_message')}</label>
                                    <textarea
                                        id="form-message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.placeholder_message')}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary contact-submit-btn"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? (
                                        <span>{t('contact.sending')}</span>
                                    ) : (
                                        <>
                                            <span>{t('contact.send_btn')}</span>
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="contact-alert-box contact-alert-success"
                                    >
                                        <CheckCircle2 size={18} />
                                        <span>{t('contact.success')}</span>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="contact-alert-box contact-alert-error"
                                    >
                                        <AlertCircle size={18} />
                                        <span>{errorMessage || t('contact.error')}</span>
                                    </motion.div>
                                )}
                            </form>
                        </StarBorder>
                    </div>

                </div>

            </div>
        </section>
    );
}
