# Technical Documentation – Assignment 3

## Overview
This project is an enhanced version of a responsive personal portfolio website developed using HTML, CSS, and JavaScript. It includes advanced interactivity, API integration, complex logic, and state management to create a more dynamic and user-friendly web application.

## Technologies Used
- HTML5 – Structure and semantic layout
- CSS3 – Styling, layout, responsive design, and transitions
- JavaScript – Interactivity, API integration, logic handling, and state management
- GitHub API – Fetching and displaying real-time repository data

## Website Structure

### index.html
Contains the main structure of the website:
- Header with navigation
- Hero section with dynamic greeting
- Visitor name section (state management feature)
- About section
- Projects section (with search, filter, and sorting features)
- GitHub repositories section (API integration)
- Contact form
- Footer

### css/styles.css
Handles:
- Layout and spacing
- Responsive design for different screen sizes
- Dark/light theme styling
- Hover effects and transitions
- Styling for cards, buttons, and sections

### js/script.js
Implements:
- Dynamic greeting based on time of day
- Dark/light theme toggle with localStorage
- Visitor name storage and display using localStorage
- Contact form validation with multiple conditions
- Search functionality for projects
- Sorting projects (by name and year)
- Filtering projects by level (beginner/advanced)
- Timer to track how long the user stays on the website
- Fetching and displaying GitHub repositories using API

## Responsive Design
The layout adapts to:
- Desktop (structured multi-section layout)
- Tablet (adjusted spacing and layout)
- Mobile (stacked layout for better readability)

CSS media queries ensure usability across all screen sizes.

## API Integration
The website uses the GitHub API to:
- Fetch public repositories from the user’s GitHub account
- Display repository name, description, and link
- Handle errors by showing a user-friendly message if the API fails

## State Management
State is managed using localStorage:
- Theme preference (dark/light mode)
- Visitor name (saved and displayed across sessions)

This ensures a consistent user experience even after refreshing the page.

## Limitations
- The contact form does not send data to a server (front-end only)
- API depends on internet connection and GitHub availability
- Project images and some links are placeholders

## Future Improvements
- Connect the contact form to a backend service
- Improve UI design and animations
- Add more dynamic data sources (e.g., other APIs)
- Enhance filtering and sorting features
