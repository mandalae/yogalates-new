import React, {useEffect, useState} from 'react';

import CourseService from '../../services/CourseService';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    CourseService.getAllCourses().then(courses => {
      setCourses(courses.sort((a,b) => {
        return a.year > b.year;
      }));
    });
  }, []);

  return (
    <main className="courses">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Kurser</h1>
          <p className="lead text-muted">Her kan du finde nogle af de kurser jeg har deltaget i.</p>
        </div>
      </section>

      <section className="container d-flex col-8">
          <ul className="list-group w-100">
            {courses.map((course, index) => {
                return <li className="list-group-item w-100 d-flex" key={index}><span className="mr-auto">{course.name}</span><span>{course.year}</span></li>;
            })}
          </ul>
      </section>
    </main>
  );
}

export default Courses;
