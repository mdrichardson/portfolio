import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import codeStyle from './codeStyle.css';
export default class CodeBlock extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  }

  static defaultProps = {
    language: 'tsx',
  }

  render() {
    const { language, value } = this.props;
    console.log(value)

    return (
      <SyntaxHighlighter language={language} customStyle={ codeStyle } useInlineStyles={ false } wrapLines={ true } lineProps={{className: 'undetected'}} codeTagProps={{style: {}}}>
        {value}
      </SyntaxHighlighter>
    );
  }
}
