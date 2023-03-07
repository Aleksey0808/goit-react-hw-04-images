import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Content } from './Modak.styles';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  prototype = {
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  onkBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.openModal();
    }
  };
  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <Content>
          <div>
            <img src={this.props.src} alt={this.props.alt}></img>
          </div>
        </Content>
      </Backdrop>,
      modalRoot
    );
  }
}

export default Modal;
