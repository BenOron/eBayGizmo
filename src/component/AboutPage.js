import React from "react";
import CarouselImages from "./controls/carouselImages/CarouselImages"
import {Link} from "react-router-dom";

const AboutPage = (props) => {
    const  {image,description} = props;

    return (
        <div className={'about_page_wrapper'}>
            <h1 className={'about_page_title'} style={{textAlign:"start"}}>About The Program</h1>
                { image && <div className={'box about_page_image'}><img src={image} alt={'not found'} /></div>}
            { !image && <div className={'box about_page_image'}> <h1>Loading image...</h1></div>}
                { description && <div className={'box about_page_description'}>
                    <span>{description}</span>
                    <div className={'nav_buttons'}>
                       <Link to="/imagesByDate">View Images By Date</Link>
                       <Link to="marsWeather">View Weather</Link>
                    </div>
                </div> }
            <div className={'box about_page_images_gallery'}>
                <h2 style={{padding:"10px"}}>Curiosity rover images<span style={{color:'#bca06c'}}> from today</span></h2>
                <CarouselImages />
            </div>
        </div>
    )
}

AboutPage.defaultProps = {
    image:'https://mars.nasa.gov/internal_resources/586/',
    description:'Mission Overview\n'
                + 'The Mars Science Laboratory spacecraft\n'
                + 'launched from Cape Canaveral Air Force Station, Florida, on Nov. 26, 2011. Mars rover\n'
                + 'Curiosity landed successfully on the floor of\n'
                + 'Gale Crater on Aug. 6, 2012 Universal Time\n'
                + '(evening of Aug. 5, Pacific Time), at 4.6 degrees\n'
                + 'south latitude, 137.4 degrees east longitude\n'
                + 'and minus 4,501 meters (2.8 miles) elevation.\n'
                + 'Engineers designed the spacecraft to steer itself during descent through Mars’ atmosphere\n'
                + 'with a series of S-curve maneuvers similar to\n'
                + 'those used by astronauts piloting NASA space\n'
                + 'shuttles. During the three minutes before touchdown, the spacecraft slowed its descent with\n'
                + 'a parachute, then used retrorockets mounted\n'
                + 'around the rim of its upper stage. In the final\n'
                + 'seconds, the upper stage acted as a sky crane,\n'
                + 'lowering the upright rover on a tether to land on\n'
                + 'its wheels.'
}




export default AboutPage




