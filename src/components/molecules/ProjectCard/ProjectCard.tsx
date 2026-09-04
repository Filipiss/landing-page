import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

interface ProjectCardProps {
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

export default function ProjectCard({
    id,
    tags,
    icon,
    category,
    title,
    shortDesc,
    viewProjectText,
    onClick,
    index
}: ProjectCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            onClick={onClick}
            className={`project-editorial-card project-card-${id}`}
        >
            <div className="project-card-header-bar font-mono">
                <span className="project-category-tag">{category}</span>
                <span className="project-num-tag">0{index + 1} //</span>
            </div>

            <div className="project-card-main-content">
                <div className="project-card-title-row">
                    <div className="project-card-icon-slot">
                        {icon}
                    </div>
                    <h3 className="project-card-title">{title}</h3>
                </div>

                <p className="project-card-description">{shortDesc}</p>

                <div className="project-card-footer font-mono">
                    <div className="project-tags-list">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="project-mono-tag">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <span className="project-action-link">
                        <span>{viewProjectText}</span>
                        <ArrowUpRight size={14} />
                    </span>
                </div>
            </div>
        </motion.article>
    );
}
