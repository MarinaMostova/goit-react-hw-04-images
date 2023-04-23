import axios from 'axios';

async function fetchImages(searchOuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '33857774-d4152e7dd23a1d1cd9f80d986';
  const perPage = 12;

  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchOuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );
  return response.data;
}

export default fetchImages;
