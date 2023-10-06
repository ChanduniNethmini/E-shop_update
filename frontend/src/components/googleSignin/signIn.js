import React, { useEffect, useState } from "react";
import { auth, provider } from "./config.js";
import { signInWithPopup } from "firebase/auth";
import Home from "../Home.jsx";

function SignIn() {
	const [value, setValue] = useState("");
	const handleClick = () => {
		signInWithPopup(auth, provider).then((data) => {
			setValue(data.user.email);
			localStorage.setItem("email", data.user.email);
		});
	};

	useEffect(() => {
		setValue(localStorage.getItem("email"));
	});
	const content = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "50vh",
		backgroundColor: "#F5F5F5",
	};
	const buttonStyle = {
		padding: "20px",
		fontSize: "16px",
		border: "none",
		borderRadius: "4px",
		backgroundColor: "#4285F4",
		color: "white",
		cursor: "pointer",
		transition: "background-color 0.3s",
		":hover": {
			backgroundColor: "#2F7FFD",
		},
	};
	return (
		<div>
			{value ? (
				<Home />
			) : (
				<div style={content}>
					<button style={buttonStyle} onClick={handleClick}>
						Signin With Google
					</button>
				</div>
			)}
		</div>
	);
}

export default SignIn;
