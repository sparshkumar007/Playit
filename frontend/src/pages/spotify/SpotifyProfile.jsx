import React from 'react'

const SpotifyProfile = () => {
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-9 col-lg-7 col-xl-5">
                            <div className="card" style={{ borderRadius: "15px", backgroundColor: "#93e2bb" }}>
                                <div className="card-body p-4 text-black">
                                    <div>
                                        <h6 className="mb-4">Exquisite hand henna tattoo</h6>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <p className="small mb-0"><i className="far fa-clock me-2"></i>3 hrs</p>
                                            <p className="fw-bold mb-0">$90</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                                                alt="Generic placeholder image"
                                                className="img-fluid rounded-circle border border-dark border-3"
                                                style={{ width: "70px" }}
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <p className="mb-0 me-2">@sheisme</p>
                                                <ul className="mb-0 list-unstyled d-flex flex-row" style={{ color: "#1B7B2C" }}>
                                                    <li>
                                                        <i className="fas fa-star fa-xs"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-xs"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-xs"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-xs"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-xs"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-outline-dark btn-rounded btn-sm"
                                                    data-mdb-ripple-color="dark"
                                                >
                                                    + Follow
                                                </button>
                                                <button
                                                    type="button"
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-outline-dark btn-rounded btn-sm"
                                                    data-mdb-ripple-color="dark"
                                                >
                                                    See profile
                                                </button>
                                                <button
                                                    type="button"
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-outline-dark btn-floating btn-sm"
                                                    data-mdb-ripple-color="dark"
                                                >
                                                    <i className="fas fa-comment"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <p className="my-4 pb-1">52 comments</p>
                                    <button
                                        type="button"
                                        data-mdb-button-init
                                        data-mdb-ripple-init
                                        className="btn btn-success btn-rounded btn-block btn-lg"
                                    >
                                        <i className="far fa-clock me-2"></i>Book now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SpotifyProfile
