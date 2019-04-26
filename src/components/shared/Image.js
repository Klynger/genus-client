import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Avatar, withStyles, ButtonBase, Tooltip, Zoom } from '@material-ui/core';

const styles = ({ palette, spacing, shape, transitions }) => ({
  root: {
    borderRadius: shape.borderRadius,
    display: 'inline-block',
    padding: spacing.unit,
    height: '100%',
    width: '100%',
    transition: `background ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
    '&:hover': {
      backgroundColor: palette.background.default,
    },
  },
  roundedRoot: {
    borderRadius: '100%',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  squaredImg: {
    borderRadius: shape.borderRadius,
  },
});

const Image = props => {
  const {
    alt,
    src,
    classes,
    rounded,
    editable,
    avatarContent,
    onImageChange,
    showAvatarContent,
  } = props;

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
  const avatarClasses = classnames(classes.avatar, {
    [classes.squaredImg]: !rounded,
  });

  if (editable) {
    const rootClasses = classnames(classes.root, {
      [classes.roundedRoot]: rounded,
    });
    return (
      <Tooltip title="Clique ou arraste uma imagem" TransitionComponent={Zoom}>
        <ButtonBase className={rootClasses} {...getRootProps()}>
          <input {...getInputProps()} />
          <Avatar className={avatarClasses} src={src} alt={alt} />
        </ButtonBase>
      </Tooltip>
    );
  }

  return (
    <Avatar className={avatarClasses} src={src} alt={alt}>
      {showAvatarContent && avatarContent}
    </Avatar>
  );
};

Image.defaultProps = {
  editable: true,
  rounded: true,
  showAvatarContent: false,
};

Image.propTypes = {
  alt: PropTypes.string,
  avatarContent: (props, propName, componentName) => {
    let result = null;
    const prop = props[propName];

    if (
      typeof prop !== 'undefined' &&
      (typeof prop !== 'string' || prop.length === 0 || prop.length > 2)
    ) {
      result = new Error(
        `Invalid prop \`${propName}\` supplied to` +
          ` \`${componentName}\`. Validation failed.` +
          ` You must pass a string with 0 < ${propName}.length <= 2.`,
      );
    } else if (typeof prop === 'undefined' && props.showAvatarContent) {
      result = new Error(
        `If you pass \`showAvatarContent === true\` you have to pass a value to \`${propName}\``,
      );
    }
    return result;
  },
  classes: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  onImageChange: PropTypes.func,
  rounded: PropTypes.bool,
  showAvatarContent: PropTypes.bool,
  src: PropTypes.string,
};

export default withStyles(styles)(Image);
