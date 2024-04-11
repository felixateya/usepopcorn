import { Logo } from "../Components/Logo";

export function NavBar({ query, children }) {
  return (
    <nav className="nav-bar">
      <Logo query ={query}/>
      {children}
    </nav>
  );
}
