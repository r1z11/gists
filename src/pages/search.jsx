import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_GISTS, GET_FORKS } from "../store/actionTypes";

function Search() {

    const dispatch = useDispatch();

    const gists = useSelector((state) => state.gists.gists);
    const gistsError = useSelector((state) => state.gists.error);
    const loading = useSelector((state) => state.gists.loading);
    const forks = useSelector((state) => state.gists.forks);

    const [query, setQuery] = useState("")

    // Load public gists when the page loads
    useEffect(() => {
        if (gists.length < 1)
            dispatch({ type: GET_GISTS, payload: '/gists/public' })
    }, []);

    // Watch for changes in gists, gist error and loading indicator
    // Update state after changes
    useEffect(() => {
    }, [gists, gistsError, loading, forks]);

    // Refresh the list of public gists
    const refresh = () => {
        dispatch({ type: GET_GISTS, payload: '/gists/public' })
    }

    // Handle search input
    const handleInput = (value) => {
        setQuery(value)
    }

    // Search gists by username
    const searchUserGists = () => {
        dispatch({ type: GET_GISTS, payload: "/users/" + query + "/gists" })
    }

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
            <h1 className="text-center mb-5">Gists</h1>

            {/* Search input */}
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search gists by GitHub username" aria-label="Search gists by GitHub username" aria-describedby="search-button" value={query} onChange={(e) => handleInput(e.target.value)} />
                <button class="btn btn-primary" type="button" id="search-button" onClick={searchUserGists}>Search</button>
            </div>

            <button type="button" class="btn btn-light btn-sm text-dark mb-5" onClick={refresh}>Refresh</button>

            {/* List of gists and loading indicator */}
            {loading ? <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
                <div className="list-group">
                    {gists.map((item) => (
                        <Link key={item.id} to={{ pathname: "/forks", search: item.url, state: item }} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <img src={item.owner.avatar_url} alt="avatar-url" className="rounded-circle flex-shrink-0" width="32" height="32" />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-2">{item.owner.login}</h6>
                                    {
                                        Object.keys(item.files).map((file, i) => {
                                            const obj = item.files[file]
                                            let cl = ""
                                            switch (obj.type) {
                                                case "application/x-python":
                                                    cl = "badge bg-primary m-2 text-wrap"
                                                    break;
                                                case "text/plain":
                                                    cl = "badge bg-secondary m-2 text-wrap"
                                                    break;
                                                case "text/x-yaml":
                                                    cl = "badge bg-success m-2 text-wrap"
                                                    break;
                                                case "application/json":
                                                    cl = "badge bg-danger m-2 text-wrap"
                                                    break;
                                                case "application/xml":
                                                    cl = "badge bg-warning text-dark m-2 text-wrap"
                                                    break;
                                                case "application/javascript":
                                                    cl = "badge bg-info text-dark m-2 text-wrap"
                                                    break;
                                                case "text/markdown":
                                                    cl = "badge bg-light text-dark m-2 text-wrap"
                                                    break;
                                                case "application/x-sh":
                                                    cl = "badge bg-dark m-2 text-wrap"
                                                    break;
                                                case "text/x-java-source":
                                                    cl = "badge bg-primary m-2 text-wrap"
                                                    break;
                                                case "video/MP2T":
                                                    cl = "badge bg-secondary m-2 text-wrap"
                                                    break;
                                                case "text/csv":
                                                    cl = "badge bg-success m-2 text-wrap"
                                                    break;
                                                default:
                                                    cl = "badge bg-primary m-2 text-wrap"
                                            }
                                            return (
                                                <span key={i} className={cl}>{obj.filename} * {obj.type} * {obj.size / 1000} MB</span>
                                            )
                                        })
                                    }
                                    {/* <Link className="my-2 opacity-75" to={{ pathname: "/forks", state: item }}>View forks</Link> */}

                                    {/* {getForks(item.id)}
                                    {showForks(item.id)} */}
                                </div>
                                <small className="opacity-50 text-wrap mb-2">{new Date(item.updated_at).toUTCString()}</small>
                            </div>
                        </Link>
                    ))}
                </div>}

            {/* Error message */}
            {gistsError ? <h4 className="text-center mt-5 text-danger">{gistsError}</h4> : null}
        </div>
    );
}

export default Search;