How to use this application

## Requirements
- Node.js - Latest LTS version
- Environment variables - See `.env-example` for more information
- Created admin user - See `yarn create:admin` for more information
- Using pm2 for process management
- Running applications in pm2 with `--log-date-format "YYYY-MM-DD HH:mm Z"` flag
- Open port publically for the application or use a reverse proxy

## Installation
1. Clone this repository
2. Install the dependencies using `yarn install`
3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=5521

    USER_JWT_SECRET=secret_here
    USER_JWT_EXPIRE=31536000
    ```
4. Setup admin by running `yarn create:admin`
5. Start the application using `yarn start`


## Development
1. Clone this repository
2. Install the dependencies using `yarn install

## Scripts
- `yarn start` - Start the application
- `yarn dev` - Start the application in development mode
- `yarn create:admin` - Create an admin user
