import "./Navbar.css";

export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar__container">
				<div className="navbar__brand">
					<span className="navbar__icon">🐍</span>

					<span className="navbar__title">Snake Game</span>
				</div>

				<div className="navbar__menu">
					{/* <div className="navbar__item">Jeu</div>

					<div className="navbar__item">Classement</div> */}
				</div>
			</div>
		</nav>
	);
}
