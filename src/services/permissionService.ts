const PermissionService = {
    async getUserPermissions() {
        const response = await fetch('/api/v1/user/permissions');
        return await response.json();
    }
};

export default PermissionService;