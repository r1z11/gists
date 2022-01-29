import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_GISTS, GET_FORKS } from "../store/actionTypes";
import { apiUrl } from "../utils/constants";

function Forks(props) {

    const location = useLocation();
    console.log(location)

    const dispatch = useDispatch();

    const gists = useSelector((state) => state.gists.gists);
    const gistsError = useSelector((state) => state.gists.error);
    const loading = useSelector((state) => state.gists.loading);
    const forks = useSelector((state) => state.gists.forks);

    // Load public gists when the page loads
    useEffect(() => {
        const query = location.search.replace("?" + apiUrl, "");
        dispatch({ type: GET_FORKS, payload: query })
    }, []);

    // Watch for changes in gists, gist error and loading indicator
    // Update state after changes
    useEffect(() => {
    }, [gists, gistsError, loading, forks]);

    // Get gist forks by gist id
    const getForks = (id) => {
        dispatch({ type: GET_FORKS, payload: "/gists/" + id + "/forks?per_page=3" })
    }

    // Show gist forks by gist id
    const showForks = (id) => {
        const filteredForks = forks.filter(fork => fork.id !== id)
        return (<div>
            {filteredForks.map(item => (
                <p>{item}</p>
            ))}
        </div>)
    }

    return (
        <div className="p-5 w-100">
            {/* Title */}
            <h1 className="mb-5">Forks</h1>

            {/* List of gists and loading indicator */}
            {loading ? <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
                <div className="list-group">
                    {gists.map((item) => (
                        <a key={item.id} href={item.url} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <img src={item.owner.avatar_url} alt="avatar-url" className="rounded-circle flex-shrink-0" width="32" height="32" />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-2">{item.owner.login}</h6>
                                    <a className="my-2 opacity-75" href={item.forks_url}>View forks</a>

                                    {/* {getForks(item.id)}
                                    {showForks(item.id)} */}
                                </div>
                                <small className="opacity-50 text-wrap mb-2">{new Date(item.updated_at).toUTCString()}</small>
                            </div>
                        </a>
                    ))}
                </div>}

            {/* Error message */}
            {gistsError ? <h4 className="text-center mt-5 text-danger">{gistsError}</h4> : null}
        </div>
    );
}

export default Forks;