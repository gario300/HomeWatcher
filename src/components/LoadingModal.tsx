import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

const Loading = (props) => {
  const {show, size, color, animation, overlayColor, textStyle} = props;


  return (
    <Spinner
      visible={show}
      textContent={'Cargando'}
      textStyle={textStyle}
      size={size}
      color={color}
      animation={animation}
      overlayColor={overlayColor}
    />
  );
};

Loading.propTypes = {
  show: PropTypes.bool,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  text: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  animation: PropTypes.string,
};

Loading.defaultProps = {
  show: false,
  text: 'text',
  textStyle: {
    color: 'white',
  },
  size: 'large',
  color: 'white',
  animation: 'fade',
  overlayColor: '#000000AA',
};

export default Loading;
