// Ship methods

// Ship Factory Function
const Ship = (len) => {
  // Properties
  const length = len;
  let orientation = 'horizontal';
  let segments = Array(len).fill(null);

  // Getters
  const getLength = () => length;
  const getOrientation = () => orientation;
  const getSegments = () => segments;

  // Functions
  const toggleOrientation = () => {
    orientation === 'vertical'
      ? (orientation = 'horizontal')
      : (orientation = 'vertical');
  };

  const isSunk = () => segments.every((seg) => seg === 'hit');

  const hit = (index) => {
    segments.splice(index, 1, 'hit');
  };

  // Object
  return {
    getSegments,
    getLength,
    getOrientation,
    isSunk,
    hit,
    toggleOrientation,
  };
};

export default Ship;
