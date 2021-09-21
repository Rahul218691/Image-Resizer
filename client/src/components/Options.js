import React from 'react';

const Options = ({to,setTo,width,setWidth,height,setHeight,show,setShow}) =>{

  const re = /^[0-9\b]+$/;
  const handleShow = (data) =>{
      if(data === 'ico'){
        setShow(false)
      }else{
        setShow(true)
      }
  }

	return(
      <div className="options__box">
         <div className="row">
           <div className="col-md-6">
              <div className="form-group">
                <label>Convert to</label>
                <select className="form-control" value={to}
                onChange={(e)=>{
                  setTo(e.target.value)
                  handleShow(e.target.value)
                }}>
                  <option value="0">Choose Convert Type</option>
                  <option value="jpg">JPG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="ico">ICO (64x64)</option>
                </select>
              </div>
           </div>
            {
              show && (
           <div className="col-md-6">
             <div className="row">
               <div className="col-md-6">
              <div className="form-group">
                  <label>Width</label>
                  <input type="text" className="form-control"
                  value={width}
                  onChange={(e)=>{
                    if(e.target.value === '' || re.test(e.target.value)){
                      setWidth(e.target.value)
                    }
                  }}
                  />
              </div>
               </div>
               <div className="col-md-6">
              <div className="form-group">
                  <label>Height</label>
                  <input type="text" className="form-control"
                  value={height}
                  onChange={(e)=>{
                    if(e.target.value === '' || re.test(e.target.value)){
                      setHeight(e.target.value)
                    }
                  }}
                  />
              </div>  
               </div>
             </div>            
           </div> 
              )
            }          
         </div>
      </div>
		)
}

export default Options;