import React from 'react';
import { commands } from 'react-mde';
import { Button } from '@material-ui/core';
import breaklineCommand from './BreaklineCommand';
import strikethroughCommand from './StrikethroughCommand';
import {
  WrapText,
  FormatBold,
  FormatItalic,
  StrikethroughS,
  InsertLink,
  FormatQuote,
  InsertPhoto,
  FormatListBulleted,
  FormatListNumbered,
  Title,
} from '@material-ui/icons';

const setCommandButtonClass = command => ({
  ...command,
  buttonComponentClass: Button,
});

const listCommands = [
  {
    commands: [
      setCommandButtonClass(commands.headerCommand),
      commands.boldCommand,
      commands.italicCommand,
      strikethroughCommand,
    ],
  },
  {
    commands: [commands.linkCommand, commands.quoteCommand, commands.imageCommand],
  },
  {
    commands: [commands.orderedListCommand, commands.unorderedListCommand, breaklineCommand],
  },
];

const getIcon = name => {
  switch (name) {
    case 'breakline':
      return <WrapText />;
    case 'bold':
      return <FormatBold />;
    case 'italic':
      return <FormatItalic />;
    case 'strikethrough':
      return <StrikethroughS />;
    case 'link':
      return <InsertLink />;
    case 'quote':
      return <FormatQuote />;
    case 'image':
      return <InsertPhoto />;
    case 'ordered-list':
      return <FormatListNumbered />;
    case 'unordered-list':
      return <FormatListBulleted />;
    default:
      return <Title />;
  }
};

export default {
  getIcon,
  listCommands,
};
