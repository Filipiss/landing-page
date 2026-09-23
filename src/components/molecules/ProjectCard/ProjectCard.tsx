import { ReactNode, FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

export interface ProjectCardProps {
  id: string;
  tags: string[];
  icon: ReactNode;
  category: string;
  title: string;
  shortDesc: string;
  viewProjectText: string;
  onClick: () => void;
  index: number;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  id,
  tags,
  icon,
  category,
  title,
  shortDesc,
  viewProjectText,
  onClick,
  index
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      onClick={onClick}
      className={`c-projectCard c-projectCard--${id}`}
    >
      <div className="c-projectCard__header u-fontMono">
        <span className="c-projectCard__category">{category}</span>
        <span className="c-projectCard__num">0{index + 1} //</span>
      </div>

      <div className="c-projectCard__content">
        <div className="c-projectCard__titleRow">
          <div className="c-projectCard__icon">
            {icon}
          </div>
          <h3 className="c-projectCard__title">{title}</h3>
        </div>

        <p className="c-projectCard__description">{shortDesc}</p>

        <div className="c-projectCard__footer u-fontMono">
          <div className="c-projectCard__tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="c-projectCard__tag">
                {tag}
              </span>
            ))}
          </div>

          <span className="c-projectCard__action">
            {viewProjectText}
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
