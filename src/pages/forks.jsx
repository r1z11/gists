import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_FORKS } from "../store/actionTypes";

function Forks() {

    const location = useLocation();
    const id = location.search.replace("?", "");

    const dispatch = useDispatch();

    const forksError = useSelector((state) => state.gists.forksError);
    const loadingForks = useSelector((state) => state.gists.loadingForks);
    const forks = useSelector((state) => state.gists.forks);

    // Load gists' forks when the page loads
    useEffect(() => {
        dispatch({ type: GET_FORKS, payload: "/gists/" + id })
    }, []);

    // Watch for changes in forks, forks error and loading indicator
    // Update state after changes
    useEffect(() => {
    }, [forksError, loadingForks]);

    // Show the top 3 forks
    const showForks = () => {
        const newForks = []
        for (let i = 0; i < 3; i++) {
            try {
                if (forks?.forks[i]) newForks.push(forks?.forks[i])
            } catch (error) {
                console.log(error)
            }
        }

        return newForks.length > 0 ? newForks.map((item) => (
            <div key={item.id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <img src={item.owner.avatar_url} alt="avatar-url" className="rounded-circle flex-shrink-0" width="32" height="32" />
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-2">{item.owner.login}</h6>
                        <p className="my-2 opacity-75">{item.description}</p>
                    </div>
                    <small className="opacity-50 text-wrap mb-2">{new Date(item.updated_at).toUTCString()}</small>
                </div>
            </div>
        )) : <h4 className="text-center text-secondary my-5">No forks</h4>
    }

    return (
        <div className="p-5 w-100">
            {/* Title */}
            <h1 className="mb-4">Gist Forks</h1>
            {/* Avatar and Username */}
            <h4 className="mb-4">{forks?.owner?.avatar_url ? <img src={forks.owner.avatar_url} alt="avatar-url" className="rounded-circle flex-shrink-0 me-3" width="42" height="42" /> : null} {forks?.owner?.login}</h4>
            {/* Description */}
            <h4 className="mb-3">{forks?.description}</h4>
            {/* Pull and Push buttons */}
            <a className="btn btn-primary btn-sm mb-3 me-3" href={forks?.git_pull_url} target="_blank" rel="noreferrer">Pull</a>
            <a className="btn btn-primary btn-sm mb-3" href={forks?.git_push_url} target="_blank" rel="noreferrer">Push</a>
            {/* Dates */}
            <p className="my-3">Created at: {new Date(forks?.created_at).toUTCString()}</p>
            <p className="mb-3">Updated at: {new Date(forks?.updated_at).toUTCString()}</p>

            {/* List of top 3 forks and loading indicator */}
            {loadingForks ? <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
                <div className="list-group">
                    {showForks()}
                </div>}

            {/* Error message */}
            {forksError ? <h4 className="text-center mt-5 text-danger">{forksError}</h4> : null}

            {/* Back to Gists */}
            <Link to="/" className="text-center text-primary mt-5">Back to Gists</Link>
        </div>
    );
}

export default Forks;