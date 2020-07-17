import React from 'react'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import uid from 'uid'

import { KIERAN_GREY } from 'styles'

const Label = styled.label`
    border: 1px solid ${KIERAN_GREY};
    border-radius: 5px;
    color: ${KIERAN_GREY};
    cursor: pointer;
    display: inline-block;
    height: 23px;
    padding: 6px 12px;
    & > input {
        display: none;
    }
`

const PhotoPlaceholder = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 150x;
    justify-content: center;
    margin-top: 20px;
    width: 100%;

    & > img:first-child {
        margin-bottom: 20px;
    }
`

const UploadingState = styled.div`
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    color: #000;
    right: 50%;
    font-size: 24px;
    padding: 20px;
    position: fixed;
    top: 50%;
    transform: translate(50%, 50%);
`

const PhotosHolder = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`

const PhotoHolder = styled.div`
    border: 1px solid black;
    border-style: dashed;
    height: 60px;
    margin: 5px;
    position: relative;
    width: 60px;
`

const UploadedImage = styled.img`
    height: 60px;
    width: 60px;
`

const CarouselImageContainer = styled.div`
    background: #fff;
    & > img {
        object-fit: contain;
        height: 300px;
        width: 250px;
    }
`

const StyledThumb = styled.img`
    object-fit: contain;
    height: 50px;
`

const DeleteImage = styled.img`
    position: absolute;
    top: -8px;
    right: -10px;
    width: 25px;
`

const ProgressContainer = styled.div`
    background: #ccc;
    border-radius: 5px;
    height: 5px;
    margin-top: 20px;
    width: 100%;
`

const ProgressBar = styled.div`
    background: ${KIERAN_GREY};
    border-radius: 5px;
    height: 5px;
    width: ${({ percentage }) => `${percentage}%`};
    z-index: 999;
`

const customRenderThumb = (children) => {
    if (children) {
        return children.map((item) => {
            if (item && item.props) {
                return <StyledThumb src={item.props.children.props.src} />
            }
            return null
        })
    }
    return null
}

export const VisitPhotos = ({
    deletePhoto,
    displayPhotos,
    inEditMode,
    percentageDone,
    setDisplayPhotos,
    setPhotosToSendToServer,
    uploadingPhotos,
}) => {
    const onDrop = (event) => {
        const totalPhotos = displayPhotos.length + event.target.files.length
        if (totalPhotos > 5) {
            alert('Sorry, only 5 photos allowed per trip')
            return
        }
        if (event.target.files && event.target.files[0]) {
            const files = Array.from(event.target.files)
            Promise.all(
                files.map((file) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader()
                        reader.addEventListener('load', (ev) => {
                            resolve({ local: ev.target.result, server: file, uid: uid() })
                        })
                        reader.addEventListener('error', reject)
                        reader.readAsDataURL(file)
                    })
                }),
            ).then(
                (images) => {
                    setPhotosToSendToServer(images)
                    setDisplayPhotos([...displayPhotos, ...images])
                },
                (error) => {
                    console.error(error)
                },
            )
        }
    }

    return inEditMode ? (
        <div>
            <PhotosHolder>
                {[1, 2, 3, 4, 5].map((photo, index) => {
                    return displayPhotos[index] ? (
                        <PhotoHolder key={displayPhotos[index].local}>
                            <UploadedImage src={displayPhotos[index].local} alt="" />
                            <DeleteImage
                                src="/images/remove.svg"
                                alt=""
                                onClick={() => deletePhoto(displayPhotos[index], index, displayPhotos[index].uid)}
                            />
                        </PhotoHolder>
                    ) : (
                        <PhotoHolder />
                    )
                })}
            </PhotosHolder>
            <PhotoPlaceholder>
                <div>
                    {uploadingPhotos && (
                        <UploadingState>
                            <div>Saving trip</div>
                            <ProgressContainer>
                                <ProgressBar percentage={percentageDone} />
                            </ProgressContainer>
                        </UploadingState>
                    )}
                    <Label>
                        <input type="file" multiple onChange={(e) => onDrop(e)} />
                        Choose Photos
                    </Label>
                </div>
            </PhotoPlaceholder>
        </div>
    ) : (
        <>
            {uploadingPhotos && (
                <UploadingState>
                    <div>Saving trip</div>
                    <ProgressContainer>
                        <ProgressBar percentage={percentageDone} />
                    </ProgressContainer>
                </UploadingState>
            )}
            {displayPhotos && (
                <Carousel showThumbs={true} renderThumbs={customRenderThumb}>
                    {displayPhotos.map((photo) => {
                        return (
                            <CarouselImageContainer key={photo.local}>
                                <img src={photo.local} />
                            </CarouselImageContainer>
                        )
                    })}
                </Carousel>
            )}
        </>
    )
}
