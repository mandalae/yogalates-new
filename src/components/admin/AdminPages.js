import React, {useState, useEffect} from 'react';
import { Redirect, useParams } from "react-router-dom";
import sessionUtils from '../../lib/session';
import PageService from '../../services/PageService';
import ImageService from '../../services/ImageService';

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Plugins for md editor
import CenterText from 'markdown-it-center-text';
import MarkdownEditorCenterPlugin from '../../utils/MarkdownEditorCenterPlugin';

MdEditor.use(MarkdownEditorCenterPlugin);

// Initialize a markdown parser
const mdParser = new MarkdownIt().use(CenterText);

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
            content: content,
            type: 'article'
        }
        const result = await PageService.savePage(page);
        if (result.success) {
            showToast('success', 'Siden er blevet gemt');
            updatePageList(page);
        }
    };

    const handleImageUpload = async file => {
        await ImageService.uploadImage(file);
        return Promise.resolve(`https://cdn.yogalates.dk/${file.name}`);
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
