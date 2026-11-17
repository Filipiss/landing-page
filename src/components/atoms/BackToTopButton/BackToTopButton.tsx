import { FC } from 'react';
import { ArrowUp } from 'lucide-react';
import './BackToTopButton.css';

export const BackToTopButton: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="c-backToTopButton"
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
    >
      <ArrowUp size={20} className="c-backToTopButton__icon" />
    </button>
  );
};

export default BackToTopButton;
