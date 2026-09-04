import { ReactNode } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
    avatar: ReactNode;
    name: string;
    handle: string;
    role: string;
    description: string;
    tags?: string[];
}

export default function ProfileCard({
    avatar,
    name,
    handle,
    role,
    description,
    tags
}: ProfileCardProps) {
    return (
        <div className="editorial-profile-card">
            <div className="profile-card-top">
                <div className="profile-card-avatar">
                    {avatar}
                </div>
                <div className="profile-card-identity">
                    <h3 className="profile-card-name">{name}</h3>
                    <span className="profile-card-handle font-mono">{handle}</span>
                    <span className="profile-card-role font-mono">{role}</span>
                </div>
            </div>

            <p className="profile-card-bio">{description}</p>

            {tags && tags.length > 0 && (
                <div className="profile-card-tags font-mono">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="profile-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
