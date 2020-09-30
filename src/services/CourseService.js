const CourseService = {
    getAllCourses: () => {
        return fetch(`https://api.yogalates.dk/courses`)
            .then((res) => res.json())
            .then(result => result)
            .catch(console.log);
    }
};

export default CourseService;