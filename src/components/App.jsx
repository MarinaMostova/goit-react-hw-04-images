import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import fetchImages from 'services/fetch-images';
import Modal from './Modal';
import './App.css';

const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageInfo, setImageInfo] = useState({ largeImage: '', tags: '' });

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    setLoading(true);
    try {
      const data = await fetchImages(searchQuery, page);
      if (data.hits.length === 0) {
        return toast(
          ' 🤷‍♂️ Sorry, there are no images matching your search query. Please try again.'
        );
      }

      setImages(images => [...images, ...data.hits]);
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = inputData => {
    const query = inputData.toLowerCase().trim();

    if (query === '') {
      toast('🔍 What are you looking for?');
      return;
    } else if (query === searchQuery) {
      toast(`🔍 You are already looking at "${query}"`);
    } else {
      setSearchQuery(query);
      setImages([]);
      setPage(1);
    }
  };

  const openModal = (largeImage, tags) => {
    setImageInfo({ largeImage, tags });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageInfo({ largeImage: '', tags: '' });
  };

  const onClickButton = () => {
    setPage(page + 1);
  };

  const allPages = totalHits / images.length;

  return (
    <div className="app">
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {allPages > 1 && !isLoading && images.length > 0 && (
        <Button onClick={onClickButton} />
      )}

      {isLoading && <Loader />}

      {error && <p>Oops! Something went wrong! Please try again</p>}

      {showModal && <Modal onClose={closeModal} image={imageInfo} />}

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
