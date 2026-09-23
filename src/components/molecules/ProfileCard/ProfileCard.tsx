import { ReactNode, FC } from 'react';
import './profileCard.css';

export interface ProfileCardProps {
  avatar: ReactNode;
  name: string;
  handle: string;
  role: string;
  description: string;
  tags?: string[];
}

export const ProfileCard: FC<ProfileCardProps> = ({
  avatar,
  name,
  handle,
  role,
  description,
  tags
}) => {
  return (
    <div className="c-profileCard">
      <div className="c-profileCard__top">
        <div className="c-profileCard__avatar">
          {avatar}
        </div>
        <div className="c-profileCard__identity">
          <h3 className="c-profileCard__name">{name}</h3>
          <span className="c-profileCard__handle u-fontMono">{handle}</span>
          <span className="c-profileCard__role u-fontMono">{role}</span>
        </div>
      </div>

      <p className="c-profileCard__bio">{description}</p>

      {tags && tags.length > 0 && (
        <div className="c-profileCard__tags u-fontMono">
          {tags.map((tag, idx) => (
            <span key={idx} className="c-profileCard__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
