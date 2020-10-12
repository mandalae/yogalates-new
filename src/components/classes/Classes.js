import React, {useEffect, useState} from 'react';

import ClassService from '../../services/ClassService';

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

      <section className="container d-flex col-8">
          <div className="row">
            {classes.map((classObject, index) => {
                return (
                    <div className="col-md-4" key={'class-' + index}>
                        <div className="card mb-4 box-shadow">
                            <img className="card-img-top" src={classObject.imageUrl ? classObject.imageUrl : '/images/yoga-' + (Math.round(Math.random() * 2)+1) + '.jpg'} alt={'Billede for hold ' + classObject.name} />
                            <div className="card-body">
                                <h2>{classObject.name}</h2>
                                <p className="card-text mb-0">{classObject.time}</p>
                                <p className="card-text mb-0">{classObject.text}</p>
                                <small className="mb-4 d-block">{classObject.address1} - {classObject.address2} - {classObject.postCode} - {classObject.city}</small>
                                <div className="d-flex justify-content-between align-items-center">
                                    <a href={'mailto:june@yogalates.dk?subject=Tilmelding til ' + classObject.name} className="btn btn-sm btn-outline-primary">Tilmeld hold</a>
                                    {classObject.link && classObject.link !== 'yogalates.dk' ? <a href={'http://' + classObject.link} className="btn btn-sm btn-outline-secondary">Webside</a> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
      </section>
    </main>
  );
}

export default Courses;
