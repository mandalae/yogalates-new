import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';
import PageService from '../../services/PageService';

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
        setContent(content);
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

    // const handleImageUpload = async file => {
    //     await ImageService.uploadImage(file);
    //     return Promise.resolve(`https://cdn.yogalates.dk/${file.name}`);
    // };

    return (
        <section className="jumbotron">
            <div className="container">
                <h1 className="jumbotron-heading">{headline ? 'Retter side: ' + headline : 'Opret ny side'}</h1>
                <form onSubmit={savePage}>
                    <div className="form-group">
                        <label htmlFor="headline">Overskrift</label>
                        <input type="text" value={headline} onChange={handlePageHeadlineChange} className="form-control" id="headline" placeholder="Skriv overskrift" autoFocus />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="content">Tekst</label>
                        <MDEditor
                            value={content}
                            onChange={handleEditorChange}
                            height="600"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={savePage}>Gem</button>
                </form>
            </div>
        </section>
    );
}

export default AdminPages;
