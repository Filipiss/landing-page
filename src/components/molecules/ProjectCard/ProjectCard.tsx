import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import StarBorder from '../../atoms/StarBorder/StarBorder';
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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={onClick}
            className="project-card-wrapper"
        >
            <StarBorder className="project-card-star-wrapper" innerClassName="project-card-editorial" speed="5s">
                {/* Mockup / Visual Area */}
                <div className={`project-card-visual project-card-visual-${id}`}>
                <div className="project-card-visual-content">
                    <div className="project-card-icon-wrapper">
                        {icon}
                    </div>
                </div>
                <span className="project-card-category-pill">
                    {category}
                </span>

                <button
                    className="project-card-circle-arrow"
                    aria-label={viewProjectText}
                    type="button"
                >
                    <ArrowUpRight size={20} />
                </button>
            </div>

            {/* Card Content */}
            <div className="project-card-info">
                {/* Tech Tags */}
                <div className="project-card-pills-row">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="project-tag-pill">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="project-card-headline">
                    <span>{title}</span>
                </h3>

                <p className="project-card-summary">
                    {shortDesc}
                </p>
            </div>
            </StarBorder>
        </motion.div>
    );
}
