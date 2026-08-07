import React from 'react';
import { CardGrid } from '../components/CardGrid';
import { PermissionService } from '../services/permissionService';
import { RoleBasedCardRenderer } from '../components/RoleBasedCardRenderer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorBoundary } from '../components/ErrorBoundary';

const DashboardPage = () => {
    const [permissions, setPermissions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const userPermissions = await PermissionService.getUserPermissions();
                setPermissions(userPermissions);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPermissions();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorBoundary>{error.message}</ErrorBoundary>;

    return (
        <div>
            <h1>Dashboard</h1>
            <RoleBasedCardRenderer permissions={permissions} />
        </div>
    );
};

export default DashboardPage;