import session from "../lib/session";

const PageService = {
    getPage: pageName => {
        return fetch(`https://api.yogalates.dk/pages/${pageName}`)
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    },
    getAllPages: () => {
        return fetch(`https://api.yogalates.dk/pages`)
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    },
    savePage: page => {
        return fetch(`https://api.yogalates.dk/pages`,
            {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Authorization': session.getJWTToken()
                },
                body: JSON.stringify(page)
            })
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    }
};

export default PageService;
