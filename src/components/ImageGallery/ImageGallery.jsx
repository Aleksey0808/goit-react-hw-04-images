import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

function ImageGallery({ images, openModal }) {
  return (
    <List>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          description={tags}
          smallImage={webformatURL}
          largeImage={largeImageURL}
          openModal={openModal}
        />
      ))}
    </List>
  );
}

ImageGallery.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
