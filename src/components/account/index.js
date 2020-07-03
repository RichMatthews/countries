import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { updateProfilePhoto } from 'redux/action-creators/user/update-profile-photo'

import { firebaseApp } from '../../config.js'

const Container = styled.div`
    background-image: url(/images/wavy-bg.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 15vh;
    padding-top: 100px;
    position: fixed;
    width: 100%;
`

const Inner = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 85px;
`

const ProfilePhoto = styled.img`
    border-radius: 75px;
    height: 75px;
    width: 75px;
`

const UserName = styled.div`
    font-size: 20px;
`

const Location = styled.div`
    color: #b1b1b3;
    font-size: 16px;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    height: 45vh;
    margin: auto;
    width: 90%;
`

const Section = styled.div`
    margin: 10px 0 10px 0;
    width: 100%;
`

const Heading = styled.div`
    border-bottom: 1px solid #b1b1b3;
    color: #414149;
    font-weight: bold;
    font-size: 20px;
`

const SectionContent = styled.div`
    color: #b1b1b3;
    display: flex;
    justify-content: space-between;
    padding: 10px 0 10px 0;
`

export const Account = ({ userPersonalDetails }) => {
    const { email, homeLocation, name, profilePhoto } = userPersonalDetails
    const [photo, setPhoto] = useState(null)
    console.log(photo, 'oh')
    const onDrop = (e) => {
        uploadPhotos(e.target.files)
    }

    const uploadPhotos = (uploadedPhotos) => {
        const uploadImageAsPromise = (imageFile) => {
            return new Promise((resolve, reject) => {
                const storage = firebaseApp.storage().ref(`${userPersonalDetails.uid}/personalDetails/profilePhoto`)
                var task = storage.put(imageFile)
                setPhoto(imageFile)
                task.on(
                    'state_changed',
                    function progress(snapshot) {
                        // var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // uploader.value = percentage
                    },
                    function error(err) {
                        console.log('photo error:', err)
                    },
                    function complete() {
                        var downloadURL = task.snapshot.downloadURL
                        console.log('=+++', downloadURL)
                    },
                )
            })
        }
        var imageFile = uploadedPhotos[0]
        uploadImageAsPromise(imageFile)
    }

    const getPhotos = async () => {
        const storage = firebaseApp.storage()
        let gsReference
        if (process.env.NODE_ENV === 'development') {
            gsReference = storage.refFromURL('gs://countries-development.appspot.com/')
        } else {
            gsReference = storage.refFromURL('gs://countries-5e1e5.appspot.com/')
        }
        gsReference = gsReference.child(`${userPersonalDetails.uid}/personalDetails`)

        const { items: references } = await gsReference.listAll()
        const result = references.map(async (reference) => {
            const url = await reference.getDownloadURL()
            let response = null
            try {
                response = await fetch(url)
            } catch (error) {
                console.log('ERROR GETTING PHOTOS:', error)
                response = error
            }

            return {
                response,
                url,
                reference: reference.fullPath,
            }
        })

        let referencesWithUrls = await Promise.all(result)
        referencesWithUrls = referencesWithUrls.filter((result) => !(result.response instanceof Error))
        const updatedPhotos = referencesWithUrls.map((pr) => {
            return pr
        })
        // setPhotos(updatedPhotos)
    }

    return Object.keys(userPersonalDetails).length ? (
        <Container>
            <Inner>
                <div>
                    <ProfilePhoto src={photo ? photo : profilePhoto} width="100" onClick={() => updateProfilePhoto} />
                    <input type="file" onChange={(e) => onDrop(e)} />
                </div>
                <UserName>{name}</UserName>
                <Location>{homeLocation.city}</Location>
            </Inner>
            <Bottom>
                <Section>
                    <Heading>Profile Settings</Heading>
                    <SectionContent>
                        <span>email</span> <span>{email}</span>
                    </SectionContent>
                </Section>

                <Section>
                    <Heading>Account Settings</Heading>
                    <SectionContent>
                        <span>email</span> <span>{email}</span>
                    </SectionContent>
                </Section>
            </Bottom>
        </Container>
    ) : (
        <div>Loading user profile...</div>
    )
}

const mapState = ({ userPersonalDetails }) => ({
    userPersonalDetails,
})

const mapDispatch = {
    updateProfilePhoto,
}

export const AccountContainer = connect(mapState, mapDispatch)(Account)
