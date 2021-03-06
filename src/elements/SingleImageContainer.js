import React from 'react'
const UserInfoUrl = 'https://www.flickr.com/photos/'

export const SingleImageContainer = (props) => {
    const ImageInfo = props.imageData;
    return (
        <>
            <img className='imageBox' alt={ImageInfo.title} src={ImageInfo.media.m} />
            <div className='imageInfoBox'>
                {ImageInfo.title.trim() == '' ?
                    <p className='imageName'>
                        <a target="_blank" href={UserInfoUrl + ImageInfo.author_id}>
                            {ImageInfo.author.substring(0, 50) + `${ImageInfo.author.length > 50 ? '...' : ''}`}
                        </a>
                    </p>
                    :
                    <p className='imageName'>
                        <a target="_blank" href={ImageInfo.link}>{ImageInfo.title.substring(0, 50) + `${ImageInfo.title.length > 50 ? '...' : ''}`}</a> by <a target="_blank" href={UserInfoUrl + ImageInfo.author_id}>{ImageInfo.author.substring(0, 50) + `${ImageInfo.author.length > 50 ? '...' : ''}`}</a>
                    </p>
                }

                <p className='imageDescription' title={ImageInfo.description}>
                    Description: {ImageInfo.description.substring(0, 120) + `${ImageInfo.description.length > 120 ? '...' : ''}`}
                </p>
                <p className='imageTags' title={ImageInfo.tags}>
                    Tags: {ImageInfo.tags.trim().replaceAll(' ', ', ')}
                </p>
            </div>
        </>
    )
}
