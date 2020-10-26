module.exports = {
    deezer: {
        path: 'https://connect.deezer.com/oauth/auth.php?',
        redirect_uri: '&redirect_uri=http://localhost:5000/auth/deezer/redirect',
        app_id: 'app_id=437882',
        perms: '&perms=basic_access,email,manage_library,manage_community,delete_library'
    },
    jwt: 'edswhateds',
    url: 'http://localhost:5000'
}