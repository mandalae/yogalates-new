import React, {useEffect, useState} from 'react';

import ClassService from '../../services/ClassService';
import ClassList from './ClassList';

function Courses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    ClassService.getAllClasses().then(classes => {
      setClasses(classes);
    });
  }, []);

  return (
    <main className="classes">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Hold</h1>
          <p className="lead text-muted">Her kan du finde de hold jeg underviser i.</p>
        </div>
      </section>

      <section className="container d-flex col-12">
        <ClassList classes={classes} />
      </section>
    </main>
  );
}

export default Courses;
