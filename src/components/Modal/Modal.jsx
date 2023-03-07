import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Content } from './Modak.styles';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, alt, src }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <Content>
        <div>
          <img src={src} alt={alt}></img>
        </div>
      </Content>
    </Backdrop>,
    modalRoot
  );
}

Modal.prototype = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
