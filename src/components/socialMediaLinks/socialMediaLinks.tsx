import React from 'react';

import './socialMediaLinks.scss';

interface SocialMediaLinksProps {
  url?: string
  title?: string
  text?: string
};

const SocialMediaLinks = ({url, title, text}: SocialMediaLinksProps) => {

  const urlToShare = url ? encodeURIComponent(url) : encodeURIComponent(window.location.href);
  const textToShare = text ? encodeURIComponent(text) : 'Vaalikone%3a+Eduskuntavaalit+2019'

  const facebookShareLink = `https://www.facebook.com/sharer.php?sdk=joey&u=${urlToShare}&display=popup&quote=${textToShare}`;
  const twitterShareLink = `https://twitter.com/intent/tweet?text=${textToShare}&url=${urlToShare}`;
  const whatsappShareLink = `whatsapp://send?text=${textToShare}+${urlToShare}`;

  return <div className="social-media">
    <div className="social-media__title">{title || 'Jaa vaalikone'}</div>
    <div className="social-media__icons">
        <a href={facebookShareLink} target="_blank" rel="noopener noreferrer">
          <img src={`${window.location.origin}/facebook-circle.png`} alt="facebook" />
        </a>
        <a href={twitterShareLink} target="_blank" rel="noopener noreferrer">
          <img src={`${window.location.origin}/twitter-circle.png`} alt="twitter" />
        </a>
        <a href={whatsappShareLink} className="whatsapp" target="_blank" rel="noopener noreferrer">
          <img src={`${window.location.origin}/whatsapp-circle.png`} alt="whatsapp" />
        </a>
    </div>
  </div>;
}

export default SocialMediaLinks;
