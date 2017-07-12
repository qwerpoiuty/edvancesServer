/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "DATABASE_URI": "postgres://edvances:3dvanc3d@52.187.118.139:5432/edvancesdb",
    "SESSION_SECRET": "Optimus Prime is my real dad",
    "LOGGING": true,
    "AZURE_STORAGE_ACCOUNT": 'edvancesstorage',
    'AZURE_STORAGE_ACCESS_KEY': 'iBKzlrDk5Q91fkecyVYCjoBSl1XwLyDNrMkloUoqfVtRo9YAcprZSMhezRyBeeDm3UGIyFNnQFSw6axRHK2hWQ==',
    "AZURE_ENDPOINT": 'DefaultEndpointsProtocol=https;AccountName=edvancesstorage;AccountKey=iBKzlrDk5Q91fkecyVYCjoBSl1XwLyDNrMkloUoqfVtRo9YAcprZSMhezRyBeeDm3UGIyFNnQFSw6axRHK2hWQ==;EndpointSuffix=core.windows.net'

};