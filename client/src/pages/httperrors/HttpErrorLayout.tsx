import type { ReactNode } from "react";

import { useNavigate } from "react-router-dom";

export default function HttpErrorLayout({ children }: { children: ReactNode }) {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1)
    }

    return (
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center flex-column">
            {children}
            <br />
            <button onClick={goBack} className="btn btn-primary">
                <i className="fa fa-chevron-left" />
                <span>Quay lại</span>
            </button>
        </div>
    )
}