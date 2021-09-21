import React,{useState} from 'react';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Image from './images/logo.jpg';
import UploadComp from './components/UploadComp';
import Options from './components/Options';
import axios from 'axios';
import Loading from './components/Loading';

const App = () =>{

  const [file,setFile] = useState(null);
  const [to,setTo] = useState('');
  const [width,setWidth] = useState('');
  const [height,setHeight] = useState('');
  const [show,setShow] = useState(true);
  const [loading,setLoading] = useState(false);

  const submitConvert = async() =>{
    if(!to || to === '0'){
      return toast.error('Choose convert type')
    }
    let formdata = new FormData();
    formdata.append('file',file);
    formdata.append('height',height);
    formdata.append('width',width);
    formdata.append('to',to);
    setLoading(true)
    const {data} = await axios.post(`http://localhost:5000/api/convert`,formdata,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    toast.success(data.msg);
    let url;
    axios({
      url:`http://localhost:5000/download/${data.file}`,
      method:'GET',
      responseType:'blob'
    })
    .then(response=>{
        url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',`${data.file}`);
        document.body.appendChild(link);
        link.click();   
        link.parentNode.removeChild(link);   
    })
    await axios.get(`http://localhost:5000/api/${data.file}`);
    setFile(null);
    setTo('');
    setWidth('');
    setHeight('');
    window.URL.revokeObjectURL(url);
    setLoading(false);
  }

  return (
    <div className="app container">
    {loading && <Loading />}
    <ToastContainer />
    <div className="main">
      <h1 className="text-center">Image Resizer</h1>
      <div className="text-center">
        <img src={Image} alt="" className="img-fluid"/>
      </div>
      <Options 
        to={to}
        setTo={setTo}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        show={show}
        setShow={setShow}
      />
      <div className="upload__component">
        <UploadComp setFile={setFile}/>
      </div>
      <div className="upload_btn mt-2">
        <button className="btn btn-block btn-primary" disabled={!file} onClick={submitConvert}>Convert</button>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
