import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyButton = ({ text, title }) => {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
      <button className="blue-button">{copied ? "Copied!" : title}</button>
    </CopyToClipboard>
  );
};

export default CopyButton;
