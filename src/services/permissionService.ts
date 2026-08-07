class PermissionService {
    static getUserPermissions() {
        // Fetch user permissions from API
        return ['checkin', 'checkout']; // Example permissions
    }
}

export { PermissionService };