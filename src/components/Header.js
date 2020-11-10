import React from "react";


//App.jsから受け取ったpropsを引数として、DOMをレンダリングしている
const Header = (props) => {
	return (
		<header className="App-header">
			<h2>{props.text}</h2>
		</header>
	);
};

export default Header;
