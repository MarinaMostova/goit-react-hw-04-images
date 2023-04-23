import { ThreeCircles } from 'react-loader-spinner';
import './Loader.css';
const Loader = () => {
  return (
    <div className="loader">
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#374cd1"
        innerCircleColor="grey"
        middleCircleColor="#374cd1"
      />
    </div>
  );
};

export default Loader;
