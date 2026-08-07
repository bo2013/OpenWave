import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"

export function AuthCard({ IsSignUp }: { IsSignUp: boolean }) {
	const navigate = useNavigate();
	const [auth, setAuth] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [error, setError] = useState("")

	function doAuth(event: React.MouseEvent<HTMLButtonElement>) {
		const button = event.currentTarget
		button.disabled = true
		setError("")

		// Password check if sign up mode
		if (IsSignUp) {
			if (auth.password != auth.confirmPassword) {
				setError('Mật khẩu không khớp')
				button.disabled = false
				return
			}
		}


		fetch("/api/v1/auth/" + (IsSignUp ? "register" : "login"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: auth.email,
				password: auth.password
			})
		}).then((resp) => resp.json())
			.then((data) => {
				if (data.success) {
					navigate("/")
					return
				}

				switch (data.code) {
					case "EMAIL_ALREADY_REGISTERED":
						setError('Email đã được đăng ký')
						break
					case "PASSWORD_LENGTH_PROBLEM":
						setError('Mật khẩu không đạt yêu cầu')
						break
					case "USER_NOT_FOUND":
						setError(`Người dùng chưa đăng ký`)
						break
					case "WRONG_PASSWORD":
						setError("Sai mật khẩu")
						break
					default:
						setError(`Lỗi không xác định: ${data.code}`)
						break
				}
			}).finally(() => button.disabled = false)
	}

	return (
		<div className="container d-flex justify-content-center align-items-center min-vh-100">
			<div className="card shadow p-4"> {/*style={{ width: "18rem" }}*/}
				<h5 className="card-title text-center">{IsSignUp ? "Đăng ký" : "Đăng nhập"}</h5>
				<div className="mb-3">
					<label className="form-label" htmlFor="email">Email:</label>
					<input className="form-control" required placeholder="Email" type="email" onChange={(e) => { setAuth({ ...auth, email: e.target.value }) }} />
				</div>
				<div className="mb-3">
					<label className="form-label" htmlFor="password">Mật khẩu:</label>
					{/* {" "}
                            {!IsSignUp && (<a href="/">Quên mật khẩu?</a>)} */}
					<input className="form-control" required placeholder="Mật khẩu" type="password" onChange={(e) => { setAuth({ ...auth, password: e.target.value }) }} />
				</div>

				{IsSignUp && (
					<div className="mb-3">
						<label className="form-label" htmlFor="password">Xác nhận mật khẩu:</label>
						<input className="form-control" required placeholder="Mật khẩu" type="password" onChange={(e) => { setAuth({ ...auth, confirmPassword: e.target.value }) }} />
					</div>
				)}
				{error && (
					<div className="alert alert-danger">
						<i className="fa fa-warning"></i> <span>{error}</span>
					</div>
				)}
				<button className="btn btn-primary" onClick={doAuth}>{IsSignUp ? "Đăng ký" : "Đăng nhập"}</button>
				<p className="text-center">{IsSignUp ? "Đã" : "Chưa"} có tài khoản? {IsSignUp ? (<Link to="/login">Đăng nhập</Link>) : (<Link to="/register">Đăng ký</Link>)}</p>
			</div>
		</div>
	)
}