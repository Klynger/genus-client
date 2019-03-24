import { MarkdownUtil, commands } from 'react-mde';

const StrikethroughCommand = {
  ...commands.strikeThroughCommand,
  execute: (state0, api) => {
    const newSelectionRange = MarkdownUtil.selectWord({
      text: state0.text,
      selection: state0.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    const state2 = api.replaceSelection(`~~${state1.selectedText}~~`);
    api.setSelectionRange({
      start: state2.selection.end - 2 - state1.selectedText.length,
      end: state2.selection.end - 2,
    });
  },
};

export default StrikethroughCommand;
