import React from 'react';
import { IconType } from 'react-icons';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, desc }) => (
  <div data-aos="fade-up" className="col-12 col-md-6 col-lg-3">
    <div className="card h-100 shadow-sm border-0 hover-shadow transition">
      <div className="card-body text-center">
        <Icon size={48} className="mb-3 text-primary"/>
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-muted">{desc}</p>
      </div>
    </div>
  </div>
);

export default FeatureCard;
