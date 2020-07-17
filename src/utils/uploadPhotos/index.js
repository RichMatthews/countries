import { firebaseApp } from '../../config.js'

export const uploadPhotos = (uploadedPhotos, userId, countryCode, visitId, setPercentageDone, setUploadingPhotos) => {
    setUploadingPhotos(true)
    return new Promise((res, rej) => {
        const uploadImageAsPromise = (imageFile) => {
            return new Promise((resolve, reject) => {
                const storage = firebaseApp.storage().ref(`${userId}/${countryCode}/${visitId}/${imageFile.name}`)

                var task = storage.put(imageFile)

                task.on(
                    'state_changed',
                    function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        setPercentageDone(percentage)
                    },
                    function error(err) {
                        console.log('photo error:', err)
                    },
                    function complete() {
                        var downloadURL = task.snapshot.downloadURL
                        setUploadingPhotos(false)
                        res()
                    },
                )
            })
        }
        for (var i = 0; i < uploadedPhotos.length; i++) {
            var imageFile = uploadedPhotos[i].server
            uploadImageAsPromise(imageFile)
        }
    })
}
