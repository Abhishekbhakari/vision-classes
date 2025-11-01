// src/components/MathContent.jsx
import React from "react";
import MathJax from "react-mathjax-preview";

const MathContent = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose prose-invert max-w-none text-[15px] leading-relaxed">
      <MathJax math={`<div>${content}</div>`} />
    </div>
  );
};

export default MathContent;
