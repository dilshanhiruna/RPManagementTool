const Logout = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div>
				<button onClick={handleLogout}>
					Logout
				</button>
		</div>
	);
};

export default Logout;