/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "DATABASE_URI": "postgres://edvances:3dvanc3d@52.187.73.126:5432/edvancesdb",
    "SESSION_SECRET": "Optimus Prime is my real dad",
    "LOGGING": true,
    "AZURE_STORAGE_ACCOUNT": 'edvances',
    'AZURE_STORAGE_ACCESS_KEY': 'E69FNxbG0QQF+rLoFRRYulGDKWOYMmfUn1WmNtf9uznDauN0yksEgFFZot+sYPcjEGoHSRl2ccPj8R8JAPaHYA=='

};