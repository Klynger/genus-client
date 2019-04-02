import ReactMde from 'react-mde';
import Commands from './commands';
import PropTypes from 'prop-types';
import * as Showdown from 'showdown';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { withStyles } from '@material-ui/core';
import 'react-mde/lib/styles/css/react-mde-all.css';

const styles = () => ({
  editor: {
    paddingBottom: '10px',
    '& .mde-preview': {
      overflowX: 'auto',
    },
    '& .mde-preview .mde-preview-content': {
      padding: '0px',
      margin: '10px',
    },
    '&:first-child': {
      background: '#f9f9f9',
    },
  },
  preview: {
    '&:first-child': {
      background: 'white',
    },
  },
});

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const CustomMarkdownEditor = ({ classes, name, onChange, content }) => {
  const [tab, handleChangeTab] = useState('write');
  const editorClasses = classNames.bind(classes);
  return (
    <ReactMde
      name={name}
      onChange={onChange}
      value={content}
      selectedTab={tab}
      onTabChange={selectedTab => handleChangeTab(selectedTab)}
      generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
      commands={Commands.listCommands}
      readOnly={tab === 'preview'}
      className={editorClasses('editor', { preview: tab === 'preview' })}
      getIcon={Commands.getIcon}
      l18n={{ write: 'Editar', preview: 'Visualizar' }}
    />
  );
};

CustomMarkdownEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomMarkdownEditor);
