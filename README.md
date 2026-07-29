# Shopify-App

## Description

A small SPA to practice making an interactive e-commerce webpage with centralized state, reusable components and  responsive styling.

## Technologies Used

| Tool | Purpose |
| :----: | :-------: |
| ReactJS | Reusable components and convenient routing |
| TailwindCSS | Fast, Responsive Styling |
| Material UI | Pretty reusable components. Mostly just experimental|
| Redux Toolkit | Centralized Products and Cart state for consistent UI updates |

## Learning Objectives

Understanding the flow of a Redux application and understanding differences between Context API managed state application and Redux state managed application. 

Experimenting with Material UI components and comparing with standard Tailwind styling.

## Limitations

* Currently the Checkout button does nothing since I don't have a backend to forward the order request to.
* Using a dummy products.json file to display products. 

## Future Improvements

* Adding a working Checkout button 
* Adding an actual API to fetch products from instead of a dummy json file. The basic fetch template was incorporated in this project but not properly utilized
* Adding user authentication and session management
* Linking a working backend and database to handle microservices and better data storage, as well as adding a limit to how many products can be loaded at once.




