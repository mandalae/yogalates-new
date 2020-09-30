const PageService = {
    getPage: pageName => {
        return fetch(`https://api.yogalates.dk/pages/${pageName}`)
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    }
};

export default PageService;