import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import PageService from '../../services/PageService';

import Markdown from '../../utils/ReactMarkdownIt';

function Article() {
    const [page, setPage] = useState({});

    const {pageName} = useParams();

    useEffect(() => {
        if (pageName) {
            PageService.getPage(pageName).then(page => {
              setPage(page);
            });
        }
    }, [pageName]);

    return (
        <main className="article">
          <section className="container d-flex col-8">
              <div className="col-12 p-4 ml-4 bg-light rounded">
                <h2>{page.headline}</h2>
                <Markdown source={page.content} />
              </div>
          </section>
        </main>
    );
}

export default Article;
