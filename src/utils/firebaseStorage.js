import { storage } from 'firebase'

export const getDownloadURL = async (fileRef) => {
    if (fileRef) {
        const refStorage = storage().ref(fileRef)
        const url = await refStorage.getDownloadURL()
        return url
    } else {
        return new Error('Error fetching file')
    }
}