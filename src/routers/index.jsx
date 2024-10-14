import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Organization = React.lazy(() => import('../pages/Organization'));
const CapitalUsers = React.lazy(() => import('../pages/CapitalUsers'));
const RegionUsers = React.lazy(() => import('../pages/RegionUsers'));

function CustomRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Organization />} />
        <Route path="/capital-users" element={<CapitalUsers />} />
        <Route path="/region-users" element={<RegionUsers />} />
      </Routes>
    </Suspense>
  );
}

export default CustomRoutes;
