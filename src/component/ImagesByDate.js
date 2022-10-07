import React, { useState,useEffect } from "react";
import {getImagesByDate} from "../utils.js"
import Pagination from "./controls/pagination/Pagination"
import '../styles/flipper.css'
import {Link} from "react-router-dom"


const ImagesByDate = () => {
    const [images,setImages] = useState();
    const [loading,setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(25);
    const [date,setDate] = useState()
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [currentRecords,setCurrentRecords] = useState();
    const nPages = Math.ceil(images?.length / recordsPerPage)

    const getImages = async (selectedDate) => {
        getImagesByDate(selectedDate).then(res => {
            if (res.photos && res.photos.length > 0) {
                setImages(res.photos);
            } else {
                setImages([]);
            }
            setIsLoading(false);
        })
    }


    const handleChange = (e) => {
        setIsLoading(true);
        getImages(e.target.value)
        setDate(e.target.value);
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    useEffect(()=>{
            if(date){
                getImages(date)
                setCurrentPage(currentPage)

            }
    },[currentPage,date])

    useEffect(()=>{
        if(images){
            setCurrentRecords(images?.slice(indexOfFirstRecord, indexOfLastRecord));
        }
    },[images,indexOfFirstRecord,indexOfLastRecord])


    return (
        <div >
            <Link to="/" style={{float:'right'}}>Home</Link>
            <div style={{textAlign:"start",marginLeft:"4vw"}}>
                <h1 >Mars Images By Date</h1>
                <form >
                    <label> Earth date:
                        <input  type="text"   onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")} className={'dateInput'} onChange={handleChange}  placeholder={'Please enter date'}   max={new Date().toISOString().split('T')[0]}/>
                    </label>
                </form>
            </div>
            {!loading && currentRecords  &&  <div className={'imagesByDate'}>
                { currentRecords?.map((image,idx)=>{
                    return (
                        <div className="flip-container" style={{cursor:'pointer'}} key={'imagesByDate_' + idx}>
                            <div className="flipper" onClick={() => openInNewTab(image.img_src)}>
                                <div clas="front">
                                    <img className={'imagesByDate_img'}  src={image.img_src} alt={'N/A'}/>
                                </div>
                                <div className="back">
                                    <div style={{display: "grid",padding:"10px"}}>
                                       <span style={{textAlign:"left"}}> Name: {image?.rover?.name}</span>
                                        <span  style={{textAlign:"left"}}> Landing Date: {image?.rover?.landing_date} </span>
                                    </div>
                                </div>

                            </div>
                        </div>


                    )
                })}
        </div>}
            {!loading && images && images.length >1 && <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />}

            {!loading && images && images.length < 1 && <h1 >Not Found Data - Please Choose Different Date</h1> }

        </div>
    )
}

ImagesByDate.defaultProps = {
    image:[]
}


export default ImagesByDate