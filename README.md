# React and Strapi Job Management System

## Overview

This project is a Job Management System built using React for the frontend and Strapi for the backend. It allows users to create, update, delete, and view job listings, as well as manage associated companies.

## Project Structure

React_Strapi_Website/
│
├── TimSoft-FrontEnd/
│ ├── public/
│ ├── src/
│ ├── .gitignore
│ ├── package.json
│ ├── README.md
│ └── ...
│
├── TimSoft-BackEnd/
│ ├── config/
│ ├── database/
│ ├── public/
│ ├── src/
│ ├── .env.example
│ ├── .gitignore
│ ├── package.json
│ ├── README.md
│ └── ...
│
├── .gitignore
└── README.md


## Features

- **Job Listings**: Create, read, update, and delete job listings.
- **Company Management**: Associate companies with job listings.
- **Rich Text Descriptions**: Use rich text for job and company descriptions.
- **API Integration**: Backend API built with Strapi, frontend consumes the API using Axios.

## Technologies Used

### Frontend (TimSoft-FrontEnd)

- **React**: A JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend (TimSoft-BackEnd)

- **Strapi**: An open-source headless CMS to manage content.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **SQLite**: A C-language library that implements a small, fast, self-contained SQL database engine.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Strapi CLI

### Installation

#### Frontend

1. Navigate to the `TimSoft-FrontEnd` directory.
2. Install the dependencies:
   npm install
or
   yarn install

3. Start the development server:
npm start
or
yarn start

#### Backend

1. Navigate to the TimSoft-BackEnd directory.
2. Install the dependencies:
    npm install
    or
    yarn install
3. Start the Strapi server:
    npm run develop
    or
    yarn develop

## Environment Variables
Create a .env file in the TimSoft-BackEnd directory based on the .env.example file and configure the necessary environment variables.