import React from 'react';
import { CardGrid } from '../components/CardGrid';
import { PermissionService } from '../services/permissionService';
import { RoleBasedCardRenderer } from '../components/RoleBasedCardRenderer';

const DashboardPage = () => {
    const permissions = PermissionService.getUserPermissions();

    return (
        <div>
            <h1>Dashboard</h1>
            <RoleBasedCardRenderer permissions={permissions} />
        </div>
    );
};

export default DashboardPage;