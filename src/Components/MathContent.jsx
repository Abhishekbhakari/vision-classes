import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Helper function to check if text contains LaTeX
const containsLaTeX = (text) => {
  return text.includes('$') || text.includes('\\(') || text.includes('\\[');
};

// Helper function to render math in text
const renderMathInText = (text) => {
  if (!text) return '';
  
  // Split by $$ first (display math)
  const parts = text.split(/(\$\$[^$]+\$\$)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      // Display math
      const math = part.slice(2, -2);
      try {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(math, {
                displayMode: true,
                throwOnError: false
              })
            }}
          />
        );
      } catch (e) {
        console.error('KaTeX error:', e);
        return <code key={index}>{math}</code>;
      }
    }
    
    // Split remaining text by inline math delimiters
    const inlineParts = part.split(/(\$[^$]+\$)/g);
    return (
      <span key={index}>
        {inlineParts.map((inlinePart, i) => {
          if (inlinePart.startsWith('$') && inlinePart.endsWith('$')) {
            // Inline math
            const math = inlinePart.slice(1, -1);
            try {
              return (
                <span
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: katex.renderToString(math, {
                      displayMode: false,
                      throwOnError: false
                    })
                  }}
                />
              );
            } catch (e) {
              console.error('KaTeX error:', e);
              return <code key={i}>{math}</code>;
            }
          }
          // Regular text
          return <span key={i}>{inlinePart}</span>;
        })}
      </span>
    );
  });
};

const MathContent = ({ content }) => {
  if (!content) return null;
  
  if (!containsLaTeX(content)) {
    // If no LaTeX detected, return plain text wrapped in p tags
    return <p className="whitespace-pre-wrap">{content}</p>;
  }

  return <div className="math-content">{renderMathInText(content)}</div>;
};

export default MathContent;