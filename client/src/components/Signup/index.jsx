import { useState } from "react";
import Axios from "axios";
import { Link, BrowserRouter } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		name: "",
		type: "",
        role: "",
		interestedResearchField: "",
		studentGrouped: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		Axios.post("/usersignup", data)
		.then((res) => {
		  alert("Registered");
		localStorage.setItem("token", res.data.data);
		window.location = "/";
		console.log(res.data.data)
		})
		.catch((error) => {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		  //console.log(err);
		});
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome to the Online Movie Reservation System</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign In
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create User Account</h1>
						<input
							type="text"
							placeholder="Full Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Type"
							name="type"
							onChange={handleChange}
							value={data.type}
							required
							className={styles.input}
						/>
                        <input
							type="text"
							placeholder="Role"
							name="role"
							onChange={handleChange}
							value={data.role}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Interested Research Field"
							name="interestedResearchField"
							onChange={handleChange}
							value={data.interestedResearchField}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Student Grouped"
							name="studentGrouped"
							onChange={handleChange}
							value={data.studentGrouped}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;