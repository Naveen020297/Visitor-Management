import React from 'react';
import CardGrid from '../components/CardGrid';
import RoleBasedCardRenderer from '../components/RoleBasedCardRenderer';
import PermissionService from '../services/permissionService';

const DashboardPage = () => {
    const [permissions, setPermissions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPermissions = async () => {
            const userPermissions = await PermissionService.getUserPermissions();
            setPermissions(userPermissions.permissions);
            setLoading(false);
        };
        fetchPermissions();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            <RoleBasedCardRenderer permissions={permissions} />
        </div>
    );
};

export default DashboardPage;