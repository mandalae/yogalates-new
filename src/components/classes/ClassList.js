import React from 'react';

function ClassList({classes}) {
  const daysOfWeek = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];

  return (
    <div className="class-list d-flex flex-column text-start w-100">
      {daysOfWeek.map(day => {
        return (<div key={day}>
          {classes.filter(classObject => {
            return classObject.time.toLowerCase().indexOf(day.toLowerCase()) > -1;
          }).length > 0 ? <h4 className="weekday-headline p-2 w-100">{day}</h4> : ''}
          {classes.filter(classObject => {
            return classObject.time.toLowerCase().indexOf(day.toLowerCase()) > -1;
          }).map((classObject, index) => {
            return (<div className="d-flex mb-2">
              <div className="class-image" style={{backgroundImage: `url(${classObject.imageUrl})`}} />
              <div className="class p-2" key={`class-${index}`}>
                <h5>{classObject.name}</h5>
                <p className="mb-1">Tid: {classObject.time.replace(day, '')}</p>
                <small>Beskrivelse: {classObject.text}</small>
              </div>
              <a href={`mailto:june@yogalates.dk?subject=Tilmelding til ${classObject.name} - ${classObject.time}`} className="btn btn-sm btn-primary ms-auto me-4 h-25">Tilmeld hold</a>
            </div>);
          })}
        </div>)
      })}
    </div>
  );
}

export default ClassList;
