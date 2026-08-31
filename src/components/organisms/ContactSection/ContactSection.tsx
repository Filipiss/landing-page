import { useState, ChangeEvent, FormEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import LinkedinIcon from '../../atoms/LinkedinIcon/LinkedinIcon';
import './ContactSection.css';

export default function ContactSection() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill out all fields.');
            return;
        }

        setStatus('sending');

        // Simulate API request send
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section id="contact" className="section">
            <div className="container">

                <div className="text-center" style={{ marginBottom: '50px' }}>
                    <span className="pretitle">{t('contact.title')}</span>
                    <h2 className="section-title">{t('contact.subtitle')}</h2>
                </div>

                <div className="contact-grid">

                    {/* Direct contact info */}
                    <div className="contact-info">
                        <h3>{t('contact.direct_title')}</h3>
                        <p>{t('contact.direct_desc')}</p>

                        <div className="contact-details">
                            <a href="mailto:contato@example.com" className="contact-detail-item">
                                <span className="contact-detail-icon"><Mail size={20} /></span>
                                <span>contato@example.com</span>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-detail-item">
                                <span className="contact-detail-icon"><LinkedinIcon size={20} /></span>
                                <span>linkedin.com/in/filipidios</span>
                            </a>
                            <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="contact-detail-item">
                                <span className="contact-detail-icon"><GithubIcon size={20} /></span>
                                <span>github.com/filipidios</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div className="contact-form-wrapper">
                        <form onSubmit={handleFormSubmit} className="contact-form">
                            <div className="contact-field">
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

                            <div className="contact-field">
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

                            <div className="contact-field">
                                <label htmlFor="form-message">{t('contact.label_message')}</label>
                                <textarea
                                    id="form-message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder={t('contact.placeholder_message')}
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={status === 'sending'}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                {status === 'sending' ? (
                                    <span>{t('contact.sending')}</span>
                                ) : (
                                    <>
                                        <span>{t('contact.send_btn')}</span>
                                        <Send size={18} style={{ marginLeft: '8px' }} />
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="contact-alert contact-alert-success"
                                >
                                    {t('contact.success')}
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="contact-alert contact-alert-error"
                                >
                                    {t('contact.error')}
                                </motion.div>
                            )}
                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
}
