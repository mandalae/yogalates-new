import React, {useEffect, useState} from 'react';
import Markdown from 'react-markdown';

import PageService from '../../services/PageService';

function About() {
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    PageService.getPage('about').then(page => {
      setHeadline(page.headline);
      setContent(page.content);
    });
  }, []);

  return (
    <main className="about">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Lidt om mig</h1>
          <p className="lead text-muted">June Skaaning - Yoga instruktør.</p>
        </div>
      </section>

      <section className="container d-flex col-8">
          <div className="about-picture col-4">&nbsp;</div>
          <div className="col-8 p-4 ml-4 bg-light rounded">
            <h2>{headline}</h2>
            <Markdown children={content} />
          </div>
      </section>
    </main>
  );
}

export default About;
