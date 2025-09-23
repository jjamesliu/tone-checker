"use client";

import { ArrowUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';


export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isOneLine, setIsOneLine] = useState(true);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const textarea = textareaRef.current;

  const autoResize = () => {
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200;

      console.log('ScrollHeight:', scrollHeight); // Debug log
      setIsOneLine(scrollHeight <= 60); // Increased threshold

      if (scrollHeight <= maxHeight) {
        textarea.style.height = scrollHeight + 'px';
        textarea.style.overflowY = 'hidden';
      } else {
        textarea.style.height = maxHeight + 'px';
        textarea.style.overflowY = 'auto'
      }
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    autoResize();
  }

  useEffect(()=> {
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
        console.log('5 seconds passed, setting isScrolling to false');
      }, 1000);
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <div className='text-center pt-20 max-w-[80%] mx-auto'>
      <div className='space-y-5'>
        <h1 className='font-[700] text-5xl'>Tone Check<br/>Analyzer</h1>
        <p className='mx-auto text-md text-gray-400/80 max-w-170 '>Analyze your emails and messages for tone, clarity, and professionalism. Get insights before you send to avoid miscommunication.</p>
      </div>

      <div className='pt-10'>
        <div className={`relative search-field-wrapper rounded-2xl ${isInputFocused ? "focused" : ""} ${isOneLine ? '!rounded-4xl' : ""} `}>
            <textarea
            ref={textareaRef}
            className={`search-input py-[1rem] ${isOneLine ? 'w-[calc(100%-4rem)]' : "w-[calc(100%-1rem)] pb-12"} ${isScrolling ? "scrolling" : ""}`}
            value={inputValue}
            rows={1}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={handleInputChange}/>
            <ArrowUp className={`absolute bg-white text-black rounded-full h-9 w-9 p-2 ${isOneLine ? 'right-4 top-1/2 -translate-y-1/2 ': 'right-3 bottom-3 '}`}/>
            <div className="laser-trace top"></div>
            <div className="laser-trace bottom"></div>
        </div>
      </div>


   </div>
  );
}
