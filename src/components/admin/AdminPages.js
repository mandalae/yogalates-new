import React, {useState, useEffect} from 'react';
import { Redirect, useParams } from "react-router-dom";
import sessionUtils from '../../lib/session';
import PageService from '../../services/PageService';

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Initialize a markdown parser
const mdParser = new MarkdownIt();

function AdminPages() {
    const [page, setPage] = useState({});
    const {pageName} = useParams();

    useEffect(() => {
        if (pageName) {
            PageService.getPage(pageName).then(page => {
              setPage(page);
            });
        }
    }, [pageName]);

    const handleEditorChange = content => {
        const newPage = {
            name: page.name,
            headline: page.headline,
            content: content.text
        };
        setPage(newPage);
    };

    const savePage = e => {
        e.preventDefault();
        
        PageService.savePage(page);
    };

    if (!sessionUtils.isLoggedIn()) {
        return <Redirect to="/" />;
    } else {
        return (
            <section className="jumbotron">
                <div className="container">
                    <h1 className="jumbotron-heading">Retter side: {page.headline}</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="headline">Overskrift</label>
                            <input type="text" value={page.headline} className="form-control" id="headline" placeholder="Skriv overskrift" autoFocus />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Tekst</label>
                            <MdEditor
                              value={page.content}
                              style={{ height: "500px" }}
                              renderHTML={(text) => mdParser.render(text)}
                              onChange={handleEditorChange}
                              />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={savePage}>Opdater</button>
                    </form>
                </div>
            </section>
        );
    }
}

export default AdminPages;
