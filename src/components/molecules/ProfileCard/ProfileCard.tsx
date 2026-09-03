import { ReactNode } from 'react';
import StarBorder from '../../atoms/StarBorder/StarBorder';
import './ProfileCard.css';

interface ProfileCardProps {
    avatar: ReactNode;
    title: string;
    description: string;
}

export default function ProfileCard({ avatar, title, description }: ProfileCardProps) {
    return (
        <StarBorder className="profile-card-star-wrapper" innerClassName="profile-card" speed="5s">
            <div className="profile-card-avatar">
                {avatar}
            </div>
            <div className="profile-card-content">
                <h3 className="profile-card-title">{title}</h3>
                <p className="profile-card-desc">{description}</p>
            </div>
        </StarBorder>
    );
}
