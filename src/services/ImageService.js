import session from "../lib/session";

const ImageService = {
    getImagePutURL: (fileName, mimeType) => {
        return fetch(`https://api.yogalates.dk/images?document=${fileName}`,
            {
                headers: {
                  'Content-Type': 'application/json',
                  'X-Authorization': session.getJWTToken()
                }
            })
            .then((res) => res.json())
            .then(result => result)
            .catch(console.error);
    },
    uploadImage: async (file) => {
        const imagePutURL = await ImageService.getImagePutURL(file.name, file.type);
        return fetch(imagePutURL, {
            method: 'PUT',
            body: file
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(console.error);
    }
};

export default ImageService;
