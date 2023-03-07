import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    images: [],
    currentImageUrl: null,
    currentImageDescription: null,
    showLoadMoreBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.fetchQuery(this.state.query, this.state.page);
    }
  }

  onSubmit = FormData => {
    const { query } = FormData;
    this.setState({ query: query, page: 1, images: [] });
  };

  async fetchQuery({ query }, page) {
    try {
      const api = await apiService(query, page);
      console.log(api);

      const total = api.totalHits;
      const images = api.hits;
      const picsLast = total - 12 * this.state.page;
      console.log(picsLast);

      if (query.trim() === '') {
        return toast.error(`Nothing found for your request`, {
          autoClose: 1500,
        });
      }
      if (images.length === 0) {
        this.setState({ showLoadMoreBtn: false });
        toast.error(`Nothing found for your request`, {
          autoClose: 1500,
        });

        return;
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      }

      if (images.length > 0 && this.state.page === 1) {
        toast.info(`Found ${api.total} images for your requestё`, {
          autoClose: 1500,
        });
      }

      picsLast > 0
        ? this.setState({ showLoadMoreBtn: true })
        : this.setState({ showLoadMoreBtn: false });
    } catch (error) {
      toast.error('Enter a request!', { autoClose: 1500 });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  toggleModal = (currentImageUrl, currentImageDescription) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currentImageUrl: currentImageUrl,
      currentImageDescription: currentImageDescription,
    }));
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    scroll.scrollToBottom();
  };

  getSearchRequest = query => {
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    const { showModal } = this.state;
    return (
      <Container>
        <ToastContainer />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            src={this.state.currentImageUrl}
            alt={this.state.currentImageDescription}
          />
        )}
        <Searchbar onSubmit={this.getSearchRequest} />

        {this.state.images && (
          <ImageGallery
            images={this.state.images}
            openModal={this.toggleModal}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.showLoadMoreBtn && <Button loadMore={this.onNextFetch} />}
      </Container>
    );
  }
}
