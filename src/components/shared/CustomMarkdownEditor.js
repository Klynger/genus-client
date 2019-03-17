import PropTypes from 'prop-types';
import * as Showdown from 'showdown';
import React, { useState } from 'react';
import ReactMde, { commands } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

const listCommands = [
  {
    commands: [
      commands.headerCommand,
      commands.boldCommand,
      commands.italicCommand,
      commands.strikeThroughCommand,
    ],
  },
  {
    commands: [commands.linkCommand, commands.quoteCommand, commands.imageCommand],
  },
  {
    commands: [commands.orderedListCommand, commands.unorderedListCommand],
  },
];

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const CustomMarkdownEditor = ({ name, onChange, content }) => {
  const [tab, handleChangeTab] = useState('write');

  return (
    <ReactMde
      name={name}
      onChange={onChange}
      value={content}
      selectedTab={tab}
      onTabChange={selectedTab => handleChangeTab(selectedTab)}
      minEditorHeight={200}
      maxEditorHeight={300}
      minPreviewHeight={200}
      generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
      commands={listCommands}
    />
  );
};

CustomMarkdownEditor.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomMarkdownEditor;
