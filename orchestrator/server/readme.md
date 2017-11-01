# Cascade User Script

## How to use it

1. Pull the `CosmosDB` secrets.
  
    - Install `azure-cli`.
    - Run `az login` and follow the login process.
    - Run `npm run fetch-secrets`.
    - That's it, please make sure you don't check in the `appsettings.secrets.json` file to git.

2. If this is the first run - you need to install dependencies and build all bits - run `npm run first-start` will take care of all of that. The subsequent server runs can be done with `npm start` command which is much more faster.
3. Enjoy.

## How to remove a user from the `db` for a fresh start

1. Select the user in the list and click `Delete` button on the right - this removes the user from the database.
2. Remove `auth-token` cookie from the login page. Currently, we use the cookie to identify if user already registered and switch the buttons/greet message accordingly. This will be imrpoved soon which will allow to skip this step.
3. If you need to see the `OAuth Provider` sign in page again revoke the user tokens here: https://github.com/organizations/ProjectCascade/settings/applications/573955
4. If you need to check how the users are stored in the db, we use this db(collection is `profiles`) for all our stamps currently (subject for change): https://ms.portal.azure.com/#resource/subscriptions/6d0c80da-4dba-4504-9826-cda472970963/resourceGroups/cascade-documentdb-test/providers/Microsoft.DocumentDb/databaseAccounts/olsolomk/dataExplorer

Questions/issues? Ping `Oleg Solomka <olsolomk@microsoft.com>`.
