
export function Logo({query}) {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>{!query ? "usePopcorn" : query}</h1>
    </div>
  );
}
