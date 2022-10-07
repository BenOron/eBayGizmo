import axios from "axios";



const PATH = 'https://api.nasa.gov/mars-photos/api/v1/'
const ApiKey  ='&api_key=6KfSVyinleEDG2Jo4qIxdb1JbdQBy8QW8OJH9A5g'



//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=6KfSVyinleEDG2Jo4qIxdb1JbdQBy8QW8OJH9A5g

//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY&page=2



/**
 * Return all ImagesByDate
 * @returns {Promise<unknown>}
 */
export const getImagesByDate = async (date,page) => {
    const carousel_of_images = `rovers/curiosity/photos?earth_date=${date}${page?`&page=`+page:''}`
    let images = '';
    try {
        images = await axios.get(PATH + carousel_of_images +ApiKey);
        return images.data;
    } catch (err) {
        console.error(err);
    }
}

/**
 * Return all ImagesByDate
 * @returns {Promise<unknown>}
 */
export const getWeather = async () => {
     let weatherData = '';
     try {
         weatherData = await axios.get('../mockJson/insight_weather.json');
         return weatherData.data;
     } catch (err) {
         console.error(err);
     }
    /*axios.get('../mockJson/insight_weather.json')
        .then((res)=>{
            return(res.data);
        }).catch((err)=>{
        console.log(err);
    })*/

}
