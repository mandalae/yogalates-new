import session from "../lib/session";

const ClassService = {
    getAllClasses: () => {
        return fetch(`https://api.yogalates.dk/classes`)
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    },
    getOwnClasses: () => {
      return fetch(`https://api.yogalates.dk/classes`)
        .then((res) => res.json())
        .then(result => result)
        .catch(console.log);
    },
    deleteClass: (slug) => {
        return fetch(`https://api.yogalates.dk/classes/${slug}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': session.getJWTToken()
                },
                body: ''
            })
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    },
    saveClass: clazz => {
        return fetch(`https://api.yogalates.dk/classes`,
            {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Authorization': session.getJWTToken()
                },
                body: JSON.stringify(clazz)
            })
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    }
};

export default ClassService;
