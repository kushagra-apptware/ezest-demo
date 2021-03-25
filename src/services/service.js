import axios from 'axios'
const BaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?';
const BaseQuery = 'format=json&nojsoncallback=?'

export const getImagesFromApi = async (tagInfo) => {
    const TagsQuery = tagInfo == '' ? '' : `&tags=${tagInfo}`
    const response = await axios.get(`${BaseUrl}${BaseQuery}${TagsQuery}`)
        .then(res => {
            return res.data.items;
        })
        .catch(err => console.log('Error frm Get Images API', err))
    return response
}