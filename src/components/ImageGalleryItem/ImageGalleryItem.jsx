import PropTypes from 'prop-types';
import { Item, Image } from './imageGalleryItem.styled';

function imageGalleryItem({ description, smallImage, largeImage, openModal }) {
  return (
    <Item onClick={() => openModal(largeImage, description)}>
      <Image src={smallImage} alt={description} data-large={largeImage} />
    </Item>
  );
}

imageGalleryItem.prototype = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default imageGalleryItem;
