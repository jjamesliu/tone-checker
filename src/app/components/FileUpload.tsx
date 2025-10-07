"use client"
import { Card } from '@/app/components/ui/card';
import { Check, FileText, X, FileInput, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileUploadProps {
    onFileUpload: (fileName: string, fileContent: string) => void;
    onError?: () => void;
}

export default function FileUpload({onFileUpload, onError}: FileUploadProps) {
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success'| 'error'>('idle');
    const [fileName, setFileName] = useState<string>('');
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
      onFileUpload(content, file.name)
      setUploadStatus("success")
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
    return (
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
    )
}