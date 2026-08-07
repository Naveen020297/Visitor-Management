export const PermissionService = {
    fetchUserPermissions: async () => {
        const response = await fetch('/api/v1/user/permissions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.json();
    }
};