import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
      <main className="home">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Velkommen</h1>
            <p className="lead text-muted">Vi er i fuld gang med at lave en ny hjemmeside til Yogalates. Kom tilbage om et par dage og check igen.</p>
          </div>
        </section>

        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img className="card-img-top" src="/images/yoga-1.jpg" alt="Yoga 1" />
                            <div className="card-body">
                                <p className="card-text">Lidt om mig</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/ommig" className="btn btn-sm btn-outline-secondary">Åbn</Link>
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img className="card-img-top" src="/images/yoga-3.jpg" alt="Yoga 3" />
                            <div className="card-body">
                                <h2>Hold</h2>
                                <p className="card-text">Her kan du finde de hold jeg underviser i.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/hold" className="btn btn-sm btn-outline-secondary">Åbn</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img className="card-img-top" src="/images/yoga-2.jpg" alt="Yoga 2" />
                            <div className="card-body">
                            <p className="card-text">Uddannelser</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Åbn</button>
                                <small className="text-muted">9 mins</small>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </main>
  );
}

export default Home;
