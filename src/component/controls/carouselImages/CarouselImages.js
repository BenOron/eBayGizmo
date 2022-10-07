import React, {useEffect, useState,useCallback} from "react";
import {getImagesByDate} from "../../../utils"
import './carouselImages.css'
const CarouselImages = () => {
    const [images,setImages] = useState();

    const getImages = useCallback(async  () => {
        await getLastDay().then(date =>
                getImagesByDate(date).then(res => {
                    if (res.photos && res.photos.length > 0) {
                        setImages(res.photos);
                    } else {
                        setImages([]);
                    }
                })
        );
    }, []);


    const getLastDay = async (date = new Date()) =>{
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        const lastDayLocal = previous.toLocaleDateString("en-CA");
        return lastDayLocal;
    }


    useEffect(()=>{
        if (!images) {
            getImages();
        }

    },[images,getImages])



    const touch  = (e,back) =>{
        if(back){
            e.target.parentElement.getElementsByClassName('carouselImage_ul')[0].scrollBy(-750, 0);
        }else {
            e.target.parentElement.getElementsByClassName('carouselImage_ul')[0].scrollBy(750, 0);
        }

    }

    return (
        <section className={'carouselImages'}>
            {!images && <h1>Loading image...</h1>}
            {images  && <>  <div className="scroll-arrow" onClick={(e)=>touch(e,true)}  >&#8592;</div>
            <ul className={'carouselImage_ul'} >
                { images?.map((image,idx)=>{
                return (
                        <li className={'carouselImage_'} key={'carouselImage_' + idx}>
                            <img  className={'carouselImage'}  src={image.img_src} alt={'Not found'}/>
                        </li>
                )
            })}
            </ul>
            <div className="scroll-arrow" onClick={(e)=>touch(e)} >
                &#8594;
            </div></>}
        </section>
    )
}

CarouselImages.defaultProps = {

}

export default CarouselImages




