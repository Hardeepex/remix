import { Outlet, LiveReload } from "@remix-run/react";

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Remix App</title>
      </head>
      <body>
        {/* Header or navigation can be added here */}
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}

export default App;
