import React, { Suspense } from "react";

const RemoteButton = React.lazy(() => import("remote/Button"));

export const App = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <h1>Host</h1>
    <RemoteButton />
  </Suspense>
);
