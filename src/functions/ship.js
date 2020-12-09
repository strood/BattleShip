// Ship methods

// Ship Factory Function
const Ship = (len) => {
  // Properties
  const length = len;
  let orientation = 'horizontal';
  let segments = Array(len).fill(null);

  // getters
  const getLength = () => length;
  const getOrientation = () => orientation;
  const getSegments = () => segments;

  //functions
  const toggleOrientation = () => {
    orientation === 'vertical'
      ? (orientation = 'horizontal')
      : (orientation = 'vertical');
  };

  const isSunk = () => segments.every((seg) => seg === 'hit');

  const hit = (index) => {
    segments[index - 1] = 'hit';
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
