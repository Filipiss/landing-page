import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ArrowUpRight, Check, AlertCircle, Copy } from 'lucide-react';
import { submitContactMessage } from '../../../services/contactService';
import { ContactStatus } from '../../../types/contact';
import './contactSection.css';

interface ContactSectionProps {
  onOpenCvModal?: () => void;
}

export const ContactSection: FC<ContactSectionProps> = ({ onOpenCvModal }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<ContactStatus>('idle');
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

    try {
      await submitContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || t('contact.error'));
    }
  };

  return (
    <section id="contact" className="l-section c-contactSection">
      <div className="l-container">
        <div className="c-contactSection__kicker u-fontMono">
          <span className="c-contactSection__kickerNum">05 //</span>
          <span>{t('contact.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
        </div>

        <div className="c-contactSection__layout">
          <div className="c-contactSection__pitchCol">
            <h2 className="c-contactSection__headline u-fontDisplay">
              {t('contact.title')}
            </h2>
            <p className="c-contactSection__manifestoSub">
              {t('contact.subtitle')}
            </p>

            <div className="c-contactSection__channelsList">
              <div className="c-contactSection__channelRow u-fontMono">
                <span className="c-contactSection__channelTag">{t('contact.email_label')} //</span>
                <a href="mailto:filipi.soares.silva@gmail.com" className="c-contactSection__channelValue">
                  filipi.soares.silva@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="c-contactSection__copyBtn"
                  title="Copiar email"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={12} className="c-contactSection__copyIconSuccess" />
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

              <a
                href="https://wa.me/5548999330050"
                target="_blank"
                rel="noopener noreferrer"
                className="c-contactSection__channelRow u-fontMono"
              >
                <span className="c-contactSection__channelTag">{t('contact.whatsapp_label')} //</span>
                <span className="c-contactSection__channelValue">+55 48 99933-0050</span>
                <ArrowUpRight size={14} className="c-contactSection__channelArrow" />
              </a>

              <a
                href="https://github.com/filipiss"
                target="_blank"
                rel="noopener noreferrer"
                className="c-contactSection__channelRow u-fontMono"
              >
                <span className="c-contactSection__channelTag">{t('contact.github_label')} //</span>
                <span className="c-contactSection__channelValue">github.com/filipiss</span>
                <ArrowUpRight size={14} className="c-contactSection__channelArrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/filipiss/"
                target="_blank"
                rel="noopener noreferrer"
                className="c-contactSection__channelRow u-fontMono"
              >
                <span className="c-contactSection__channelTag">{t('contact.linkedin_label')} //</span>
                <span className="c-contactSection__channelValue">linkedin.com/in/filipiss</span>
                <ArrowUpRight size={14} className="c-contactSection__channelArrow" />
              </a>

              <button
                type="button"
                onClick={onOpenCvModal}
                className="c-contactSection__channelRow c-contactSection__channelBtn u-fontMono"
                title={t('cv_modal.title')}
              >
                <span className="c-contactSection__channelTag">{t('contact.cv_label')} //</span>
                <span className="c-contactSection__channelValue">{t('contact.cv_download_btn')}</span>
                <ArrowUpRight size={14} className="c-contactSection__channelArrow" />
              </button>
            </div>
          </div>

          <div className="c-contactSection__formCol">
            <div className="c-contactSection__formCard">
              <form onSubmit={handleFormSubmit} className="c-contactSection__form">
                <div className="c-contactSection__inputGroup">
                  <label htmlFor="form-name" className="c-contactSection__fieldLabel u-fontMono">
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
                    className="c-contactSection__input"
                  />
                </div>

                <div className="c-contactSection__inputGroup">
                  <label htmlFor="form-email" className="c-contactSection__fieldLabel u-fontMono">
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
                    className="c-contactSection__input"
                  />
                </div>

                <div className="c-contactSection__inputGroup">
                  <label htmlFor="form-message" className="c-contactSection__fieldLabel u-fontMono">
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
                    className="c-contactSection__textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="c-contactSection__submitBtn u-fontMono"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span>{t('contact.sending')}</span>
                  ) : (
                    <>
                      <span>{t('contact.send_btn')}</span>
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="c-contactSection__feedbackStrip c-contactSection__feedbackStrip--success u-fontMono">
                    <Check size={14} />
                    <span>{t('contact.success')}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="c-contactSection__feedbackStrip c-contactSection__feedbackStrip--error u-fontMono">
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
};

export default ContactSection;
