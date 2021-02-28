import React, { useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import * as toast from "../../toast";

export default function PromoDrop(props) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        if (file.type != "application/pdf" || file.size > 1048576) {
          toast.error("You may only uploads PDFs with a size of up to 1MB as promo material.")
          return;
        }

        const binaryStr = reader.result
        if (props.handlePromo) props.handlePromo(file, binaryStr);
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}
