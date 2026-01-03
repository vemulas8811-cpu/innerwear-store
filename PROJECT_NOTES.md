# Project Notes – Innerwear Store

## Overview

This is a full-stack MERN-style application for an online men’s innerwear store.

## Tech Stack

- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MySQL (Railway)
- Deployment: Render (Backend)

## Key Features

- Product listing with sorting (price low to high)
- Add to cart functionality
- Cart persistence using MySQL
- REST APIs for products and cart

## Database Design

- products table stores product details
- cart table stores product snapshot (name, price, image, quantity)

## Security

- Environment variables used for DB credentials
- `.env` excluded via `.gitignore`
- No secrets committed to GitHub

## Assumptions

- Single-user cart (no auth implemented)
- Images stored as URLs

## Improvements (Future Scope)

- User authentication
- Quantity update & remove from cart
- Image upload using cloud storage
