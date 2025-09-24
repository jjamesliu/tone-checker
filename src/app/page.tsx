"use client";

import { ArrowUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {TypeAnimation} from 'react-type-animation';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isOneLine, setIsOneLine] = useState(true);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textarea = textareaRef.current;
  const autoResize = () => {
 // Move this inside the function
    if (textarea) {
      // Reset height to auto first to get accurate scrollHeight
      textarea.style.height = 'auto';
      
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 400;
      
      // Get computed styles for accurate line height calculation
      const computedStyle = getComputedStyle(textarea);
      const lineHeight = parseInt(computedStyle.lineHeight) || 24;
      const paddingTop = parseInt(computedStyle.paddingTop) || 16;
      const paddingBottom = parseInt(computedStyle.paddingBottom) || 16;
      const totalPadding = paddingTop + paddingBottom;
      
      // More accurate single line detection
      const singleLineHeight = lineHeight + totalPadding;
      
      console.log('ScrollHeight:', scrollHeight, 'SingleLineHeight:', singleLineHeight);
      setIsOneLine(scrollHeight <= singleLineHeight + 4); // Small buffer

      if (scrollHeight <= maxHeight) {
        textarea.style.height = scrollHeight + 'px';
        textarea.style.overflowY = 'hidden';
      } else {
        textarea.style.height = maxHeight + 'px';
        textarea.style.overflowY = 'auto';
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Use setTimeout to ensure the value is updated before resize
    setTimeout(autoResize, 0);
  };

  useEffect(() => {
    autoResize();

    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  // Also run autoResize when inputValue changes (for when content is deleted)
  useEffect(() => {
    autoResize();
  }, [inputValue]);

  return (
    <div className='text-center pt-20 max-w-[80%] mx-auto'>
      <div className='space-y-5'>
        <h1 className='font-[700] text-5xl'>Tone Check<br/>Analyzer</h1>
        <p className='mx-auto text-md text-gray-400/80 max-w-170'>
          Analyze your emails and messages for tone, clarity, and professionalism. Get insights before you send to avoid miscommunication.
        </p>
      </div>

      <div className='pt-10'>
        <div className={`flex items-center px-5 relative search-field-wrapper rounded-4xl ${isInputFocused ? "focused" : ""} ${!isOneLine ? '!rounded-2xl !items-end !pb-3' : ""}`}>
          {/* TypeAnimation placeholder */}
          {!inputValue && !isInputFocused && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400/70 font-mono z-10">
              <TypeAnimation
                sequence={[
                  'Analyze your email tone...',
                  1000,
                  'Check your message clarity...',
                  1000,
                  'Improve your communication...',
                  1000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                cursor={true}
              />
            </div>
          )}
          


            <textarea
                ref={textareaRef}
                className={`search-input py-[1rem] pr-6 w-full ${isScrolling ? "scrolling" : ""}`}
                value={inputValue}
                rows={1}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onChange={handleInputChange}
                style={{ minHeight: '24px' }} // Ensure minimum height
              />
            {/* Button wrapper */}
            <button className="bg-white text-black rounded-full h-9 w-9 p-2 hover:bg-gray-200 transition-colors flex items-center justify-center ">
              <ArrowUp size={16} />
            </button>


          <div className="laser-trace top"></div>
          <div className="laser-trace bottom"></div>

        </div>
      </div>
    </div>
  );
}