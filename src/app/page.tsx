"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import LoginButton from '@/app/components/LoginButton';
import { ArrowUp, Plus, Target, Check, FileText, X, FileInput } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {TypeAnimation} from 'react-type-animation';
import ToneButton from '@/app/components/ToneButton';
import { tones, Tone } from '@/app/lib/tones';

import { Upload } from 'lucide-react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isOneLine, setIsOneLine] = useState(true);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Tone Selection States
  const [allTones, setAllTones] = useState<Tone[]>(tones);
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [customTone, setCustomTone] = useState(""); //custom tone input state
  const [showCustomInput, setShowCustomInput] = useState(false); //toggle custom input field

  const handleClickAwayCustom =  () => {
    setShowCustomInput(false);
    setCustomTone('');
  }

  const handleToneToggle = (tone: string) => {
    setSelectedTones(prev => (
      prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone]
    ));
  };

  const handleCustomToneClick = () => {
    setShowCustomInput(true);
  }

  const handleCustomToneAddClick = () => {
    if (customTone.trim()) {
      const newTone: Tone = {id: customTone.trim().toLowerCase().replace(/\s+/g, '-'), label: customTone.trim()};
      const toneExists = allTones.some(t => t.id === newTone.id);
      if (!toneExists) {
        setAllTones(prev => [...prev, newTone]);
        setSelectedTones(prev => [...prev, newTone.id]);
        setCustomTone("");
        setShowCustomInput(false);
      }
    }
  }


  const autoResize = () => {

   const textarea = textareaRef.current;
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
  };

  //handling the .txt file dropping functions
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success'| 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      setUploadStatus('error');
      return
    }

    setFileName(file.name)
    try {
      const content = await file.text()
      setInputValue(content);
      setFileContent(content);
      setUploadStatus('success');
    } catch (error) {
      console.log("there was an error parsing the file.text content");
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file);
      console.log("the dropped file is: ", file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file);
      console.log("a new file has been added: ", file)
    }
  }

  //debugging for file handling
  // useEffect(() => {
  //   console.log("the file name is: ", fileName);
  //   console.log("the file content is ", fileContent);
  // }, [fileContent])

  useEffect(() => {
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

  //Debugging
  useEffect(()=>{
    console.log("this is selected tones: ", selectedTones);
    console.log("this is all tones: ", allTones);
  }, [selectedTones, allTones]);

  return (
    <>
    <div className='p-4 flex flex-row justify-end'>
      <LoginButton/>
    </div>
    <div className='text-center pt-40 max-w-[80%] mx-auto'>
      <div className='space-y-5'>
        <h1 className='font-[700] text-5xl'>Tone Analyzer</h1>
        <p className='mx-auto text-md text-gray-400 max-w-170'>
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
              />


            <button className="bg-white text-black rounded-full h-9 w-9 p-2 hover:bg-gray-200 transition-colors flex items-center justify-center ">
              <ArrowUp size={16} />
            </button>


          <div className="laser-trace top"></div>
          <div className="laser-trace bottom"></div>

        </div>
      </div>

      <div className='flex flex-col gap-5 mt-10 max-w-200 mx-auto'>
        <div className='items-center flex flex-row gap-2'>
          <Target size={16}/> 
          <span className='font-bold text-left'>Select Expected Tone(s):</span>
        </div>
        <div className='flex flex-row gap-3 mx-auto flex-wrap justify-center'>
          {allTones.map(tone => (
              <ToneButton key={tone.id}
              tone={tone.id}
              selected={selectedTones.includes(tone.id)}
              onClick={handleToneToggle}>
                {tone.label}
              </ToneButton>
          ))}
        </div>
        <div className='flex justify-center'>
          {!showCustomInput ? (
              <ToneButton key="custom"
              icon={Plus}
              tone="custom"
              selected={selectedTones.includes("custom")}
              onClick={handleCustomToneClick}>
                Add Custom Tone
              </ToneButton>
            ): (
              <div className='flex flex-row items-center gap-2 text-sm'>
                <input type="text"
                className="border border-white/15 rounded-2xl px-4 py-2 focus:outline-none "
                placeholder="Enter Custom Tone"
                value={customTone}
                onChange={(e) => setCustomTone(e.target.value)}
                onBlur={() => handleClickAwayCustom()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCustomToneAddClick();
                  }
                }}
                autoFocus
                />
                <button className=' button-primary !bg-white !text-black'
                onMouseDown={handleCustomToneAddClick}>
                  Add Tone
                </button>
              </div>
            )}
        </div>

        <div className='my-8 font-bold'>
          <div className="w-full mb-10"> 
              <div className="flex items-center  ">
                  <div className="flex-grow h-px bg-gray-400"></div>
                  <span className="px-3 text-sm">or</span>
                  <div className="flex-grow h-px bg-gray-400"></div>
              </div>
          </div>
          
          <Card variant="dark">
            <div className='text-left space-y-1'>
              <h1 className='text-xl'>Upload Email Template</h1>
              <p className='text-sm text-gray-400 font-medium'>Drag and drop your .txt file or click to browse</p>
            </div>

            {/*This is where the user drops*/}
            <input ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".txt"
            />
            <div onClick={handleFileClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className='bg-black py-18 rounded-xl border-2  border-dotted border-white/40 hover:border-white/80 cursor-pointer transition-all duration-300'>
              <div className='mx-auto text-sm space-y-5'>
                {uploadStatus && uploadStatus == 'idle' ? 
                <>
                  {!isDragging ?
                  <>
                  <div className='mx-auto rounded-full w-fit p-4 bg-white'>
                    <Upload className='text-black'/>
                  </div>
                  <div className=''>
                    <p className='font-[600]'>Drop Your File Here</p>
                    <p className='text-gray-500 font-[500]'>or click to browse</p>
                  </div>
                  </>
                  : 
                  <>
                  <div className='mx-auto rounded-xl w-fit p-4 bg-white'>
                    <FileInput className='text-black'/>
                  </div>
                  <div>
                    Drag and Drop Your File Here...
                  </div>
                  </>
                  }
                </> 

                : uploadStatus == 'success' ?
                <>
                  <div className='mx-auto rounded-full w-fit p-4 bg-green-300'>
                    <Check className='text-black'/>
                  </div>
                  <div className='space-y-1'>
                    <p className='font-[600]'>File Uploaded Successfully</p>
                    <div className='flex items-center justify-center text-gray-500 gap-1'>
                      <FileText size={16}/>
                      <p className='font-[500]'>{fileName}</p>
                    </div>
                  </div>
                </> 
                : //Error handling
                <>
                  <div className='mx-auto rounded-full w-fit p-4 bg-red-500'>
                    <X className='text-black'/>
                  </div>
                  <div className='space-y-1'>
                    <p className='font-[600]'>Please Import a .txt file</p>
                    <div className='flex items-center justify-center text-gray-500 gap-1'>
                      <p className='font-[500]'>There was an error. Try again</p>
                    </div>
                  </div>
                </>
              }
              </div>
            </div>


          </Card>
        </div>

      </div>
    </div>
    </>
  );
}