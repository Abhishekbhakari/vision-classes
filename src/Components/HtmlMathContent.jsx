import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
// Import the auto-render extension
import 'katex/dist/contrib/auto-render.min.js';

const HtmlMathContent = ({ htmlContent }) => {
  const ref = useRef(null);

  // This hook runs after the component renders
  useEffect(() => {
    // Check if the ref is attached and the KaTeX auto-render function is available
    if (ref.current && window.renderMathInElement) {
      // This is the magic function.
      // It scans the DOM element (ref.current) for math and renders it.
      window.renderMathInElement(ref.current, {
        // Define all the delimiters KaTeX should look for
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    }
  }, [htmlContent]); // Re-run this effect every time the HTML content changes

  // 1. We render the raw HTML string using dangerouslySetInnerHTML
  // 2. We attach a ref to the div so we can access it in the useEffect hook
  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HtmlMathContent;