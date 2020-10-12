import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import sessionUtils from '../../lib/session';
import ClassService from '../../services/ClassService';

function AdminClasses({showToast, updatePageList}) {
    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        ClassService.getAllClasses().then(classes => {
          setClasses(classes);
        });
    }, []);

    const editClass = slug => {
        setCurrentClass(classes.filter(item => item.slug === slug)[0]);

        setShowModal(true);
    };

    const deleteClass = async slug => {
        const result = await ClassService.deleteClass(slug);
        if (result && result.success){
            const newClasses = classes.filter(item => {
                return item.slug !== slug;
            });
            setClasses(newClasses);
            showToast('success', 'Holdet er blevet slettet.');
        } else {
            showToast('error', 'Der skete en fejl, prøv igen.');
        }
    };

    const handleChange = e => {
        const id = e.target.id;
        const value = e.target.value;

        const newClass = {...currentClass}
        newClass[id] = value;
        setCurrentClass(newClass);
    };

    const saveClass = async e => {
        e.preventDefault();

        if (!currentClass.slug) {
            currentClass.slug = encodeURIComponent((currentClass.name + ' ' + currentClass.address1).toLowerCase().replace(/\s/gi, '-'));
        }

        const result = await ClassService.saveClass(currentClass);
        if (result && result.success) {
            const newClasses = [...classes.filter(item => item.slug !== currentClass.slug)];
            newClasses.push(currentClass);
            setClasses(newClasses);

            showToast('success', currentClass.name + ' gemt succesfuldt.');
            setShowModal(false);
        } else {
            showToast('error', 'Der skete en fejl, prøv igen.');
        }
        setCurrentClass({});
    };

    if (!sessionUtils.isLoggedIn()) {
        return <Redirect to="/" />;
    } else {
        return (
            <>
                <section className="jumbotron">
                    <div className="container">
                        <div className="d-flex">
                            <h1 className="jumbotron-heading">Hold</h1>
                            <Button variant="primary ml-auto mt-3 mb-3" onClick={() => { setShowModal(true); }}>Opret</Button>
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Hold</th>
                              <th scope="col">Tekst</th>
                              <th scope="col">Link</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {classes.map((clazz, index) => {
                                return (
                                    <tr key={index}>
                                      <th scope="row">{clazz.name}</th>
                                      <td>{clazz.time}</td>
                                      <td>{clazz.text}</td>
                                      <td>{clazz.link}</td>
                                      <td>
                                        <button onClick={() => { editClass(clazz.slug); }} className="btn btn-secondary btn-sm mr-2">Rediger</button>
                                        <button onClick={() => { deleteClass(clazz.slug); }} className="btn btn-secondary btn-sm">Slet</button>
                                      </td>
                                    </tr>
                                )
                            })}
                          </tbody>
                        </table>
                    </div>
                </section>
                <Modal show={showModal} onHide={() => { setShowModal(false); }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rediger Hold</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={saveClass}>
                            <div className="form-group">
                                <label htmlFor="name">Hold</label>
                                <input type="text" value={currentClass.name} onChange={handleChange} className="form-control" id="name" placeholder="Eksempel: Pilates" autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Tid</label>
                                <input type="text" value={currentClass.time} onChange={handleChange} className="form-control" id="time" placeholder="Eksempel: Mandag kl. 9.30 - 10.30" autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Extra tekst</label>
                                <input type="text" value={currentClass.text} onChange={handleChange} className="form-control" id="text" placeholder="Eksempel: Start uge 33" autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address1">Sted navn</label>
                                <input type="text" value={currentClass.address1} onChange={handleChange} className="form-control" id="address1" placeholder="Eksempel: Water & Wellness" autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address2">Adresse</label>
                                <input type="text" value={currentClass.address2} onChange={handleChange} className="form-control" id="address2" placeholder="Eksempel: Viborgvej 80" autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postCode">Post nr</label>
                                <input type="number" value={currentClass.postCode} onChange={handleChange} className="form-control" id="postCode" placeholder="Eksempel: 8920" autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">By</label>
                                <input type="text" value={currentClass.city} onChange={handleChange} className="form-control" id="city" placeholder="Eksempel: Randers" autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="link">Link</label>
                                <input type="text" value={currentClass.link} onChange={handleChange} className="form-control" id="link" placeholder="Eksempel: www.waterandwellness.dk" autoFocus />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={saveClass}>Gem</Button>
                        <Button variant="secondary" onClick={() => { setShowModal(false); }}>Luk</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AdminClasses;
