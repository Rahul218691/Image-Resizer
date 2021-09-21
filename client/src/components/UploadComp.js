import React from 'react';
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify';


const UploadComp = ({setFile}) =>{

	const addToList = (acceptedFiles) =>{
		if(acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png' &&acceptedFiles[0].type !== 'image/jpg'){
			return toast.error('Choose Either one of the following jpg jpeg png');
		}
		setFile(acceptedFiles[0])
	}

	return(
		<Dropzone onDrop={acceptedFiles => addToList(acceptedFiles)}>
		  {({getRootProps, getInputProps}) => (
		    <section>
		      <div {...getRootProps()}>
		        <input {...getInputProps()} />
		        <p>Drag 'n' drop file here, or click to select file</p>
		      </div>
		    </section>
		  )}
		</Dropzone>
		)
}

export default UploadComp;