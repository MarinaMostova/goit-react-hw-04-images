import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" className="loading-button" onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
