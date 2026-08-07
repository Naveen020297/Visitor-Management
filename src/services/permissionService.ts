const PermissionService = {
    getUserPermissions: async () => {
        const response = await fetch('/api/v1/user/permissions', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch permissions');
        return response.json();
    }
};

export { PermissionService };