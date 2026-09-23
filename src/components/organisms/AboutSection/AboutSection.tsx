import { FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import filipiImg from '../../../assets/filipi.jpg';
import chicoImg from '../../../assets/CHICO WAGNER.png';
import './aboutSection.css';

export const AboutSection: FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="l-section c-aboutSection">
      <div className="l-container">
        <div className="c-aboutSection__kicker u-fontMono">
          <span className="c-aboutSection__kickerNum">04 //</span>
          <span>{t('about.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
        </div>

        <div className="c-aboutSection__grid">
          <div className="c-aboutSection__manifesto">
            <h2 className="c-aboutSection__heading u-fontDisplay">
              {t('about.title')}
            </h2>

            <div className="c-aboutSection__narrative">
              <p className="c-aboutSection__paragraph">
                {t('about.bio_p1')}
              </p>
              <p className="c-aboutSection__paragraph">
                {t('about.bio_p2')}
              </p>
              <p className="c-aboutSection__paragraph">
                {t('about.bio_p3')}
              </p>
            </div>
          </div>

          <div className="c-aboutSection__artefacts">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="c-aboutSection__portraitFrame"
            >
              <div className="c-aboutSection__portraitMetaTop u-fontMono">
                <span>{t('about.meta_camera')}</span>
              </div>

              <div className="c-aboutSection__portraitBody">
                <div className="c-aboutSection__portraitImgWrapper" title="Filipi Soares">
                  <img
                    src={filipiImg}
                    alt={t('about.filipi_name')}
                    className="c-aboutSection__portraitImg"
                  />
                </div>
                <div className="c-aboutSection__portraitInfo">
                  <h3 className="c-aboutSection__portraitName u-fontDisplay">{t('about.filipi_name')}</h3>
                  <span className="c-aboutSection__portraitHandle u-fontMono">{t('about.filipi_handle')}</span>
                  <span className="c-aboutSection__portraitRole u-fontMono">{t('about.filipi_role')}</span>
                </div>
              </div>

              <p className="c-aboutSection__portraitBio">{t('about.filipi_desc')}</p>

              <div className="c-aboutSection__directContacts u-fontMono">
                <span className="c-aboutSection__directContactsLabel">{t('about.direct_contacts_label')}</span>
                <div className="c-aboutSection__directContactsList">
                  <a
                    href="https://wa.me/5548999330050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-aboutSection__contactChip c-aboutSection__contactChip--whatsapp"
                    title="Abrir WhatsApp (+55 48 99933-0050)"
                  >
                    <MessageCircle size={13} className="c-aboutSection__contactChipIcon" />
                    <span className="c-aboutSection__contactChipText">{t('about.whatsapp_label')}</span>
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href="mailto:filipi.soares.silva@gmail.com"
                    className="c-aboutSection__contactChip"
                    title="Enviar E-mail"
                  >
                    <Mail size={13} className="c-aboutSection__contactChipIcon" />
                    <span className="c-aboutSection__contactChipText">filipi.soares.silva@gmail.com</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              <div className="c-aboutSection__portraitMetaBottom u-fontMono">
                <span className="c-aboutSection__metaTag">{t('about.status_location')}</span>
                <span className="c-aboutSection__metaTag c-aboutSection__metaTag--accent">{t('about.status_availability')}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="c-aboutSection__chicoCredential"
            >
              <div className="c-aboutSection__chicoHeader u-fontMono">
                <span className="c-aboutSection__chicoKicker">{t('about.chico_kicker')}</span>
                <span className="c-aboutSection__chicoStamp">{t('about.chico_badge')}</span>
              </div>

              <div className="c-aboutSection__chicoCore">
                <div className="c-aboutSection__chicoPhotoFrame" title="Chico Wagner (CEO)">
                  <img
                    src={chicoImg}
                    alt={t('about.chico_name')}
                    className="c-aboutSection__chicoPhoto"
                  />
                </div>
                <div className="c-aboutSection__chicoIdentity">
                  <h4 className="c-aboutSection__chicoName u-fontDisplay">{t('about.chico_name')}</h4>
                  <span className="c-aboutSection__chicoRole u-fontMono">{t('about.chico_role')}</span>
                </div>
              </div>

              <p className="c-aboutSection__chicoMandate">{t('about.chico_desc')}</p>

              <div className="c-aboutSection__chicoQuote u-fontMono">
                <span>"{t('about.chico_note')}"</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
