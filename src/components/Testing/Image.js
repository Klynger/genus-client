import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Avatar, withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    height: 100,
    width: 100,
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
});

const Image = props => {
  const { classes, src, onImageChange, alt, editable, showAvatarContent, avatarContent } = props;

  const onDrop = React.useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      if (onImageChange) {
        onImageChange(base64);
      }
    };

    acceptedFiles.forEach(file => reader.readAsDataURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (editable) {
    return (
      <div className={classes.root} {...getRootProps()}>
        <input {...getInputProps()} />
        <Avatar className={classes.avatar} src={src} alt={alt} />
      </div>
    );
  }

  return (
    <Avatar className={classes.avatar} src={src} alt={alt}>
      {showAvatarContent && avatarContent}
    </Avatar>
  );
};

Image.defaultProps = {
  editable: true,
  showAvatarContent: false,
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  avatarContent: PropTypes.string,
  classes: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  onImageChange: PropTypes.func,
  showAvatarContent: PropTypes.bool,
  src: PropTypes.string,
};

withStyles(styles)(Image);

const ImageWrapper = ({ classes, ...rest }) => <Image classesProp={classes} {...rest} />;

ImageWrapper.propTypes = {
  classes: PropTypes.object,
};

export default ImageWrapper;
