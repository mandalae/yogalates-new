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

function AdminPages({showToast, updatePageList}) {
    const [name, setName] = useState('');
    const [headline, setHeadline] = useState('');
    const [content, setContent] = useState('');

    const {pageName} = useParams();

    useEffect(() => {
        if (pageName) {
            PageService.getPage(pageName).then(page => {
              setName(page.name);
              setHeadline(page.headline);
              setContent(page.content);
            });
        }
    }, [pageName]);

    const handleEditorChange = content => {
        setContent(content.text);
    };

    const handlePageHeadlineChange = e => {
        setHeadline(e.target.value);
        if (!name){
            setName(encodeURIComponent(e.target.value.toLowerCase().replaceAll(' ', '-')));
        }
    };

    const savePage = async e => {
        e.preventDefault();
        const page = {
            name: name,
            headline: headline,
            content: content
        }
        const result = await PageService.savePage(page);
        if (result.success) {
            showToast('success', 'Siden er blevet gemt');
            updatePageList(page);
        }
    };

    const handleImageUpload = file => {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = data => {
            // resolve(data.target.result);
            // console.log(data.target.result);
          };
          reader.onloadstart = data => {
            console.log(data.target);
          };
          reader.onprogress = data => {
            console.log(data.target);
          };
          reader.readAsDataURL(file);
        });
      };

    if (!sessionUtils.isLoggedIn()) {
        return <Redirect to="/" />;
    } else {
        return (
            <section className="jumbotron">
                <div className="container">
                    <h1 className="jumbotron-heading">{headline ? 'Retter side: ' + headline : 'Opret ny side'}</h1>
                    <form onSubmit={savePage}>
                        <div className="form-group">
                            <label htmlFor="headline">Overskrift</label>
                            <input type="text" value={headline} onChange={handlePageHeadlineChange} className="form-control" id="headline" placeholder="Skriv overskrift" autoFocus />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Tekst</label>
                            <MdEditor
                              value={content}
                              style={{ height: "500px" }}
                              renderHTML={(text) => mdParser.render(text)}
                              onChange={handleEditorChange}
                              onImageUpload={handleImageUpload}
                              />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={savePage}>Gem</button>
                    </form>
                </div>
            </section>
        );
    }
}

export default AdminPages;
