import React, { Component } from 'react'
import { getImagesFromApi } from '../services/service'
import { SingleImageContainer } from '../elements/SingleImageContainer'

export class ImageGridDisplay extends Component {
    constructor() {
        super();
        this.state = {
            imagesArr: [],
            isSafeTagActive: false,
            searchText: ''
        };
    }
    componentDidMount() {
        // FUNCTION CALL TO GET ALL IMAGES FROM API
        this.getAllImagesFromApi();
    }

    // FUNCTION DEFINED TO GET ALL IMAGES FROM THE API
    getAllImagesFromApi = async (tagInfo = '') => {
        let imagesArr = await getImagesFromApi(tagInfo).then(res => res);
        if (imagesArr.length > 0) {
            this.setState({ imagesArr });
        }
        else {
            this.setState({ imagesArr: [] });
        }
    }

    // FUNCTION DEFINED TO TOGGLE THE SAFE TAG
    safeTagClicked = () => {
        this.setState({ isSafeTagActive: !this.state.isSafeTagActive }, () => this.searchTagInfo());
    }

    // FUNCTION DEFINED TO GET THE IMAGES BASED ON SEARCH TAGS AND CHECK FOR SAFE ENABLE AS WELL
    searchTagInfo = () => {
        let searchText = this.state.searchText.trim();
        if (searchText == '') {
            this.getAllImagesFromApi(this.state.isSafeTagActive ? 'safe' : '');
        }
        else {
            let query = `${searchText.split(' ').join(',')}${this.state.isSafeTagActive ? ',safe' : ''}`;
            this.getAllImagesFromApi(query);
        }
    }

    render() {
        return (
            <div id='pageContainer'>
                <div id="updateTagsInfo">
                    <div id="searchTags">
                        <input
                            type="text"
                            placeholder="Search tags.."
                            value={this.state.searchText}
                            onChange={(e) => this.setState({ searchText: e.target.value })}
                            onKeyPress={(e) => e.key == 'Enter' ? this.searchTagInfo() : null}
                        />
                        <input type='button' value='Submit' onClick={() => this.searchTagInfo()} />
                    </div>
                    <div id='checkSafeTag' onClick={() => this.safeTagClicked()}>
                        <label>Enable SAFE mode</label>
                        <input type='checkbox' value={this.state.isSafeTagActive} />
                    </div>
                </div>
                <div className='main'>
                    {this.state.imagesArr.length > 0 &&
                        this.state.imagesArr.map(imageData => {
                            return (
                                <div className='imageContainer'>
                                    <div className='imageBorder'>
                                        <SingleImageContainer imageData={imageData} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ImageGridDisplay