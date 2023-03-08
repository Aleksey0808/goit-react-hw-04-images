import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Button from '../Button';
import apiService from '../../PixabayApi';
import { Container } from './App.styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    fetchQuery(query, page);
  }, [page, query]);

  async function fetchQuery(query, page) {
    try {
      await apiService(query, page).then(api => {
        const total = api.totalHits;
        const images = api.hits;
        const picsLast = total - 12 * page;

        if (images.length === 0 || query.trim() === '') {
          setShowLoadMoreBtn(false);
          toast.error(`Nothing found for your request`, {
            autoClose: 1500,
          });

          return;
        } else {
          setImages(prevState => [...prevState, ...images]);
        }

        if (images.length > 0 && page === 1) {
          toast.info(`Found ${api.total} images for your requestё`, {
            autoClose: 1500,
          });
        }

        picsLast > 0 ? setShowLoadMoreBtn(true) : setShowLoadMoreBtn(false);
      });
    } catch (error) {
      console.log(error);
      toast.error('Enter a request!', { autoClose: 1500 });
    } finally {
      setIsLoading(false);
    }
  }

  const toggleModal = (currentImageUrl, currentImageDescription) => {
    setShowModal(!showModal);
    setCurrentImageUrl(currentImageUrl);
    setCurrentImageDescription(currentImageDescription);
  };

  const onNextFetch = () => {
    setPage(prevState => prevState + 1);
    scroll.scrollToBottom();
  };

  const onSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  return (
    <Container>
      <ToastContainer />
      {showModal && (
        <Modal
          onClose={toggleModal}
          src={currentImageUrl}
          alt={currentImageDescription}
        />
      )}
      <Searchbar onSubmit={onSubmit} />

      {images && <ImageGallery images={images} openModal={toggleModal} />}
      {isLoading && <Loader />}
      {showLoadMoreBtn && <Button loadMore={onNextFetch} />}
    </Container>
  );
}
