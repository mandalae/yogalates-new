import React, {useEffect, useState} from 'react';
import ClassList from '../classes/ClassList';
import june from '../../images/june.png';
import ClassService from "../../services/ClassService";

function Home() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        ClassService.getAllClasses().then(classes => {
            setClasses(classes);
        });
    }, []);

    return (
    <main className="home">
        <section className="position-relative home-section">
            <div className="position-absolute text-white main-headline">
                <h1>Yoga med June</h1>
                <h5>&nbsp;Kom med og find din indre ro</h5>
            </div>
        </section>
        <div className="row d-flex">
            <img src={june} alt="" className="w-50 pe-0" />
            <div className="w-50 bg-light text-center p-4 ps-0 pe-0">
                <h1>June Skaaning</h1>
                <div className="w-75 d-inline-block">
                    <p>Jeg hedder June Skaaning, er fra 1961 og bosiddende nord for Randers i en lille landsby.</p>
                    <p>Jeg er uddannet som kontorassistent tilbage i 1981 og har mange kurser i den forbindelse.</p>
                    <p>I 2006 begyndte jeg mit nye liv, hvor jeg selv ville bestemme over min arbejdstid og det jeg havde lyst til. Det blev og er en dejlig rejse, med mange uddannelser og kurser indenfor bevægelse, se nærmere under uddannelser og kurser.</p>
                    <p>Den 1. januar 2017 blev jeg registreret som selvstændig, så nu er endnu et skridt nået.</p>
                    <p>Jeg vil stadig udvikle mig via kurser og uddannelser og hvem ved, hvad det bringer med sig. Jeg glæder mig.</p>
                    <p>Se mere på de næste sider, om hvad og hvor jeg er i dag.</p>
                </div>
                <h2>Hold</h2>
                <ClassList classes={classes.filter(classObject => {  return classObject.link === 'www.yogalates.dk' })} />
            </div>
        </div>
    </main>
  );
}

export default Home;
