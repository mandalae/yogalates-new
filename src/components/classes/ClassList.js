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
            return (<div className="d-flex mb-2" key={index}>
              <div className="class-image" style={{backgroundImage: `url(${classObject.imageUrl})`}} />
              <div className="class p-2 w-50" key={`class-${index}`}>
                <h5>{classObject.name}</h5>
                <p className="mb-1">Tid: {classObject.time}</p>
                <small>Beskrivelse: {classObject.text}</small>
              </div>
              <div className="class-address p-2 w-25">
                <p className="mb-1">Adresse:</p>
                <p className="small mb-0">{classObject.address1}</p>
                <p className="small mb-0">{classObject.address2}</p>
                <p className="small mb-0">{classObject.city}</p>
              </div>
              <div className="class-actions ms-auto me-4 d-flex flex-column">
                <a href={`mailto:june@yogalates.dk?subject=Tilmelding til ${classObject.name} - ${classObject.time}`} className="btn btn-sm btn-primary">Tilmeld hold</a>
                {classObject.link && classObject.link !== 'www.yogalates.dk' ? <a href={`http://${classObject.link.replace('http://', '').replace('https://', '')}`} className="btn btn-sm btn-outline-primary mt-1">Hjemmeside</a> : ''}
              </div>
            </div>);
          })}
        </div>)
      })}
    </div>
  );
}

export default ClassList;
