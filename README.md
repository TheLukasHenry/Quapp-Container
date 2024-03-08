# Guapp-Container

1. Make sure Docker Desktop is running
2. click "open in dev container" or "cmd + shift + p" + Dev Containers: Open workspace in container

3.Web setup:
npm install in the web folder
npm run g in the web folder

4. To start backend server
   select run and debug from the left nav
   choose .Net Core Launch(web)
   then click play

5. To run the web UI (next)
   choose: NextJs start

6. To deploy database
   right click QuappyMcQuapperson
   click build
   right click QuappyMcQuapperson
   click publish
   publish to existing database
   don't use profile
   select mssql-container [localhost:master:sa]
   select QuappyMcQuapperson
   select publish
   you should see "Deploy dacpac: Suceeded"

# Dev Container - README

hello Welcome to the badass dev container for the Quapp project! This README will guide you through the setup and usage of this powerful development environment. Strap in and get ready to unleash your coding skills!

## What is a Dev Container?

A dev container is a preconfigured and isolated environment that provides all the necessary tools and dependencies for developing a specific project. It ensures consistent and reproducible development environments across different machines and makes it easier to set up and collaborate on projects. Our dev container comes packed with all the goodies you need to work on the QuappyMcQuapperson project.

## Installation and Setup

To get started, follow the steps below:

1. **Install dependencies:** Navigate to the "web" folder in the cloned repository and install the necessary dependencies using npm.

```shell
cd web
npm install
```

2. **Start the server:** To start the server and run the web UI, follow these steps:

- Open the left navigation panel and select "Run and Debug."
- Choose ".Net Core Launch (web)" from the available options.
- Click on the play button to start the server.

2. **Start the UI:** To start the web UI, follow these steps:

- Open the left navigation panel and select "Run and Debug."
- Choose "Next.js start" from the available options.
- Click on the play button to start the web front end.

4. **Deploy the database:** To deploy the database for QuappyMcQuapperson, perform the following steps:

- Right-click on "QuappyMcQuapperson" in your in the database projects in the left nav.
- Select "Build" from the context menu.
- Right-click on "QuappyMcQuapperson" again.
- Click on "Publish" to start the publishing process.
- Choose the option to publish to an existing database.
- Do not use a profile for the deployment.
- Select the "mssql-container [localhost:master:sa]" connection.
- Choose the "QuappyMcQuapperson" database.
- Click on "Publish" to initiate the deployment.
- You should see a success message: "Deploy dacpac: Succeeded."

Congratulations! You now have a badass dev container ready to rock and roll with the Quapp project. Feel free to dive into the code, make awesome changes, and build something extraordinary!
