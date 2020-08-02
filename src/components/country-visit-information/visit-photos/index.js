import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-image-gallery/styles/css/image-gallery.css'
// import { Carousel } from 'react-responsive-carousel'
import ImageGallery from 'react-image-gallery'
import jimp from 'jimp'
import uid from 'uid'

import { ReactModalAdapter } from 'components/react-modal-adapter'
import { fadeIn } from 'components/react-modal-adapter'
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

const StyledModal = styled(ReactModalAdapter)`
    &__overlay {
        &.ReactModal__Overlay--before-close {
            transition: all 500ms ease-in-out;
            opacity: 0;
        }
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(49, 49, 49, 0.8);
        z-index: 1;
    }

    &__content {
        animation: ${fadeIn} 1s;
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: none;
        height: 0;
        min-height: 300px;
        overflow: hidden;
        border-radius: 4px;
        outline: none;
        margin: auto;
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
    margin: auto;
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    width: 95%;
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

const ImageRendererContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
`

const ImageRenderer = styled.div`
    background-image: ${({ image }) => `url(${image.local})`};
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    height: 110px;
    margin: 5px;
    width: 110px;
`

const Heading = styled.h3`
    font-size: 20px;
    font-weight: 600;
    text-align: left;
`

export const VisitPhotos = ({
    deletePhoto,
    displayPhotos,
    inEditMode,
    percentageDone,
    setDisplayPhotos,
    setPhotosToSendToServer,
    uploadingPhotos,
}) => {
    const [showingImages, setShowingImages] = useState([])
    const [showCarousel, setShowCarousel] = useState(false)
    const [carouselStartIndex, setCarouselStartIndex] = useState(0)

    useEffect(() => {
        if (displayPhotos.length) {
            let images = []
            displayPhotos.forEach((photo) =>
                images.push({
                    original: photo.local,
                    thumbnail: photo.local,
                    sizes: '(max-width: 600px) 200px, 50vw',
                }),
            )
            setShowingImages(images)
        }
    }, [displayPhotos])

    const onDrop = (event) => {
        const totalPhotos = displayPhotos.length + event.target.files.length
        if (totalPhotos > 6) {
            alert('Sorry, only 6 photos allowed per trip')
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

    const showCarouselAndSetIndex = (index) => {
        setCarouselStartIndex(index)
        setShowCarousel(true)
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
            {displayPhotos && showCarousel && (
                <StyledModal
                    isOpen={showCarousel}
                    closeTimeoutMS={500}
                    ariaHideApp={false}
                    onRequestClose={() => setShowCarousel(!showCarousel)}
                >
                    <CarouselImageContainer>
                        <div style={{ position: 'relative' }}>
                            <img src="/images/close.svg" width="20" />
                            <ImageGallery
                                items={showingImages}
                                thumbnailPosition="bottom"
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showNav={true}
                                showThumbnails={false}
                                startIndex={carouselStartIndex}
                            />
                        </div>
                    </CarouselImageContainer>
                </StyledModal>
            )}
            {displayPhotos.length > 0 && <Heading>Trip Photo Gallery</Heading>}
            <ImageRendererContainer>
                {displayPhotos.map((photo, index) => {
                    return <ImageRenderer image={photo} onClick={() => showCarouselAndSetIndex(index)} />
                })}
            </ImageRendererContainer>
        </>
    )
}
