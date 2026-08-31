import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './ProjectCard.css';

interface ProjectCardProps {
    id: string;
    tags: string[];
    icon: ReactNode;
    gradient: string;
    category: string;
    title: string;
    shortDesc: string;
    viewProjectText: string;
    onClick: () => void;
    index: number;
}

export default function ProjectCard({
    tags,
    icon,
    gradient,
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
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={onClick}
            className="project-card"
        >
            {/* Cover Capa with premium gradient and dynamic overlay */}
            <div
                className="project-card-cover"
                style={{ background: gradient }}
            >
                <div className="project-card-cover-glow"></div>
                {icon}
                <span className="project-card-category">
                    {category}
                </span>
            </div>

            {/* Card Body */}
            <div className="project-card-body">
                <h3 className="project-card-title">
                    {title}
                </h3>
                <p className="project-card-desc">
                    {shortDesc}
                </p>

                {/* Tech Tags */}
                <div className="project-card-tags">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="project-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="project-card-footer">
                    <span className="project-card-cta">
                        {viewProjectText}
                        <ArrowRight size={16} className="project-card-cta-arrow" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
