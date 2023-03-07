import PropTypes from 'prop-types';
import { MdOutlineDownloading } from 'react-icons/md';
import { Load } from './Button.styled';

function Button({ loadMore }) {
  return (
    <Load type="button" onClick={loadMore}>
      Load more <MdOutlineDownloading size={35} />
    </Load>
  );
}

Button.prototype = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
