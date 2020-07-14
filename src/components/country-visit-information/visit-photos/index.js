import React from 'react'
import styled from 'styled-components'
import { KIERAN_GREY } from 'styles'

import { firebaseApp } from '../../../config.js'

const DeleteSection = styled.div`
    position: relative;
    & > img {
        right: 15px;
        top: 30px;
        position: absolute;
    }
`
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
    background: #f2f5f5;
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: center;
    width: 100%;

    & > img {
        margin-bottom: 20px;
    }
`

const UploadingState = styled.div`
    color: #000;
    right: 50%;
    bottom: 50%;
    font-size: 40px;
    font-style: italic;
    transform: translate(50%, 50%);
    position: absolute;
`

export const VisitPhotos = ({
    country,
    deletePhoto,
    getPhotos,
    inEditMode,
    index,
    photos,
    setUploadingPhotos,
    uploadingPhotos,
    userPersonalDetails,
}) => {
    const onDrop = (e) => {
        uploadPhotos(e.target.files)
    }

    const uploadPhotos = (uploadedPhotos) => {
        setUploadingPhotos(true)
        const uploadImageAsPromise = (imageFile) => {
            return new Promise((resolve, reject) => {
                const storage = firebaseApp
                    .storage()
                    .ref(`${userPersonalDetails.uid}/${country.countryCode}/${imageFile.name}`)
                var task = storage.put(imageFile)

                task.on(
                    'state_changed',
                    function progress(snapshot) {
                        // var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // uploader.value = percentage
                    },
                    function error(err) {
                        setUploadingPhotos(false)
                        console.log('photo error:', err)
                    },
                    function complete() {
                        setUploadingPhotos(false)
                        var downloadURL = task.snapshot.downloadURL
                        getPhotos()
                    },
                )
            })
        }
        for (var i = 0; i < uploadedPhotos.length; i++) {
            var imageFile = uploadedPhotos[i]
            uploadImageAsPromise(imageFile)
        }
    }

    return photos[index] ? (
        <div>
            {inEditMode && (
                <DeleteSection onClick={() => deletePhoto(photos[index])}>
                    <img src="/images/delete.svg" width="30" height="30" alt="" />
                </DeleteSection>
            )}

            <img src={photos[index].url} width="100%" alt="" />
        </div>
    ) : (
        inEditMode && (
            <PhotoPlaceholder>
                <img src="/images/uploadPhoto.svg" height="50" width="50" alt="" />
                <div>
                    {uploadingPhotos && <UploadingState>Uploading...</UploadingState>}
                    <Label class="custom-file-upload">
                        <input type="file" onChange={(e) => onDrop(e, index)} />
                        Upload Photos
                    </Label>
                </div>
            </PhotoPlaceholder>
        )
    )
}
