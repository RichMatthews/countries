import { firebaseApp } from '../../config.js'

export const getPhotos = async (countryCode, tripId, userPersonalDetails) => {
    const storage = firebaseApp.storage()
    let gsReference
    if (process.env.NODE_ENV === 'development') {
        gsReference = storage.refFromURL('gs://countries-development.appspot.com/')
    } else {
        gsReference = storage.refFromURL('gs://countries-5e1e5.appspot.com/')
    }
    gsReference = gsReference.child(`${userPersonalDetails.uid}/${countryCode}/${tripId}`)

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
            local: url,
            reference: reference.fullPath,
        }
    })

    let referencesWithUrls = await Promise.all(result)
    referencesWithUrls = referencesWithUrls.filter((result) => !(result.response instanceof Error))
    const updatedPhotos = referencesWithUrls.map((pr) => {
        return pr
    })

    return updatedPhotos
}
