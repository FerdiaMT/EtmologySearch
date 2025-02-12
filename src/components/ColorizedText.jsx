import React, { useRef } from "react";
import colorMap from "../utils/colorMap";
import fetchOrigin from "../utils/fetchOrigin";

const ColorizedText = ({ text, setIsLoading }) => {
  const textRef = useRef(null);

  const processText = async () => {
    setIsLoading(true);
    const words = text.split(/\s+/);
    textRef.current.innerHTML = "";

    for (const word of words) {
      if (word) {
        const origin = await fetchOrigin(word);
        const language = Object.keys(colorMap).find((lang) =>
          origin.includes(lang)
        );
        const color = colorMap[language] || "black"; // either its the color associated in colorMap, or we default to black

        const span = document.createElement("span"); // set up the dynamically colored word
        span.textContent = word + " ";
        span.style.color = color;
        textRef.current.appendChild(span); // append it to the current words
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div ref={textRef} className="colorized-text"></div>
      <button onClick={processText}>Colorize Text</button>
    </div>
  );
};

export default ColorizedText;
