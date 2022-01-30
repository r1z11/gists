import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_FORKS } from "../store/actionTypes";

function Forks() {

    const location = useLocation();
    // console.log(location)
    const id = location.search.replace("?", "");

    const dispatch = useDispatch();

    const forksError = useSelector((state) => state.gists.forksError);
    const loadingForks = useSelector((state) => state.gists.loadingForks);
    const forks = useSelector((state) => state.gists.forks);

    // Load gists' forks when the page loads
    useEffect(() => {
        dispatch({ type: GET_FORKS, payload: "/gists/" + id + "/forks"})
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
                if (forks[i]) newForks.push(forks[i])
            } catch (error) {
                console.log(error)
            }
        }

        return newForks.length > 0 ? newForks.map((item) => (
            <div key={item.id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <img src={item.owner.avatar_url} alt="avatar-url" className="rounded-circle flex-shrink-0" width="52" height="52" />
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-2">{item.owner.login}</h6>
                        <p className="my-2 opacity-75">{item.description}</p>
                        <a className="btn btn-primary btn-sm my-3" href={item.html_url} target="_blank" rel="noreferrer">View Fork on GitHub</a>
                    </div>
                    <small className="opacity-50 text-wrap mb-2">{new Date(item.updated_at).toUTCString()}</small>
                </div>
            </div>
        )) : <h4 className="text-center text-secondary my-5">No forks</h4>
    }

    return (
        <div className="p-xs-2 p-sm-2 p-md-5 p-lg-5 p-xl-5 w-100">
            
            <h1 className="mb-5">Gist Forks</h1>

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
            <div className="text-primary mt-5"><Link to="/">Back to Gists</Link></div>
        </div>
    );
}

export default Forks;