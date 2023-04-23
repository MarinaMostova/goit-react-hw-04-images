import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import fetchImages from 'services/fetch-images';
import Modal from './Modal';
import './App.css';

class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    images: [],
    totalHits: 0,
    isLoading: false,
    error: '',
    showModal: false,
    imageInfo: { largeImage: '', tags: '' },
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.getImages(this.state.searchQuery, this.state.page);
    }
  }

  getImages = async (searchQuery, page) => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchImages(searchQuery, page);
      if (data.hits.length === 0) {
        return toast(
          ' 🤷‍♂️ Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = inputData => {
    const searchQuery = inputData.toLowerCase().trim();

    if (searchQuery === '') {
      toast('🔍 What are you looking for?');
      return;
    } else {
      this.setState({
        searchQuery,
        images: [],
        page: 1,
      });
    }
  };

  onClickButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (largeImage, tags) => {
    this.setState({ showModal: true, imageInfo: { largeImage, tags } });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imageInfo: { largeImage: '', tags: '' },
    });
  };

  render() {
    const { images, totalHits, isLoading, error, showModal, imageInfo } =
      this.state;

    const allPages = totalHits / images.length;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {allPages > 1 && !isLoading && images.length > 0 && (
          <Button onClick={this.onClickButton} />
        )}

        {isLoading && <Loader />}

        {error && <p>Oops! Something went wrong! Please try again</p>}

        {showModal && <Modal onClose={this.closeModal} image={imageInfo} />}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
