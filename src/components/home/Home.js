import React from 'react';

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
                            <img className="card-img-top" src="/images/yoga-1.jpg" alt="Yoga picture" />
                            <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at tristique augue. Donec sagittis dapibus est. Nunc ultricies aliquet ex ac molestie. Sed velit magna, consequat sit amet cursus eu, sollicitudin vestibulum ex.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-primary">Åben</button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img className="card-img-top" src="/images/yoga-3.jpg" alt="Yoga picture" />
                            <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at tristique augue. Donec sagittis dapibus est. Nunc ultricies aliquet ex ac molestie. Sed velit magna, consequat sit amet cursus eu, sollicitudin vestibulum ex.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-primary">Åben</button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img className="card-img-top" src="/images/yoga-2.jpg" alt="Yoga picture" />
                            <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at tristique augue. Donec sagittis dapibus est. Nunc ultricies aliquet ex ac molestie. Sed velit magna, consequat sit amet cursus eu, sollicitudin vestibulum ex.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-primary">Åben</button>
                                </div>
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
