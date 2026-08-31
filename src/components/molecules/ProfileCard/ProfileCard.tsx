import { ReactNode } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
    avatar: ReactNode;
    title: string;
    description: string;
}

export default function ProfileCard({ avatar, title, description }: ProfileCardProps) {
    return (
        <div className="profile-card">
            <div className="profile-card-avatar">
                {avatar}
            </div>
            <div className="profile-card-content">
                <h3 className="profile-card-title">{title}</h3>
                <p className="profile-card-desc">{description}</p>
            </div>
        </div>
    );
}
