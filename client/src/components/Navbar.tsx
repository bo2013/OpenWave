import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate()

    function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const form = new FormData(event.currentTarget);
        const query = form.get("q")?.toString().trim();

        if (!query) return;

        navigate(`/search?q=${encodeURIComponent(query)}`);

    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* Brand */}
                <Link className="navbar-brand" to="/">OpenWave</Link>

                {/* Search */}
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="q" />
                    <button className="btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
                </form>

                {/* Dropdown */}
                <div className="dropdown">
                    <a className="dropdown-toggle text-black" href="#" data-bs-toggle="dropdown"><i className="fa fa-user"></i></a>

                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><Link className="dropdown-item" to="/login"><i className="fa fa-user"></i> Đăng nhập / Đăng ký</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}