# 🌍 Wanderlust

A full-stack travel destination booking platform built with modern web technologies. Browse destinations, make bookings, manage your trips, and explore the world — all in one place.

---

## 🚀 Tech Stack

### Frontend

| Technology                               | Purpose                         |
| ---------------------------------------- | ------------------------------- |
| [Next.js](https://nextjs.org/)           | React framework with App Router |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling           |
| JavaScript                               | Core language                   |

### Backend

| Technology                                  | Purpose                             |
| ------------------------------------------- | ----------------------------------- |
| [Express.js](https://expressjs.com/)        | REST API server                     |
| [MongoDB](https://www.mongodb.com/)         | NoSQL database                      |
| [Better Auth](https://www.better-auth.com/) | Authentication & session management |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── add-destinations/
│   │   └── page.jsx              # Add new destination (admin)
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.js      # Better Auth catch-all route
│   ├── destinations/
│   │   ├── [id]/
│   │   │   └── page.jsx          # Single destination detail page
│   │   └── page.jsx              # All destinations listing
│   ├── login/
│   │   └── page.jsx              # Login page
│   ├── my-bookings/
│   │   └── page.jsx              # User's booking history
│   ├── profile/
│   │   └── page.jsx              # User profile page
│   ├── signup/
│   │   └── page.jsx              # Registration page
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── not-found.jsx             # 404 page
│
├── Components/
│   ├── Destinations/
│   │   └── BookingCard.jsx       # Destination booking UI card
│   ├── Homepage/
│   │   ├── Banner.jsx            # Hero/banner section
│   │   ├── Choose.jsx            # "Why choose us" section
│   │   ├── DestinationCard.jsx   # Destination preview card
│   │   ├── Featured.jsx          # Featured destinations section
│   │   └── Review.jsx            # Customer reviews section
│   ├── BookingCancel.jsx         # Cancel booking modal/action
│   ├── DeleteAlert.jsx           # Delete confirmation alert
│   ├── EditModal.jsx             # Edit destination modal
│   ├── Footer.jsx                # Site footer
│   └── Navbar.jsx                # Navigation bar
│
└── lib/
    ├── action.js                 # Server actions
    ├── auth-client.js            # Better Auth client config
    ├── auth.js                   # Better Auth server config
    └── proxy.js                  # API proxy/utility
```

---

## ✨ Features

- 🗺️ **Browse Destinations** — Explore travel destinations with rich detail pages
- 📋 **Booking System** — Book trips and manage reservations
- 🔐 **Authentication** — Secure sign up, login, and session management via Better Auth
- 👤 **User Profile** — View and manage your account
- 🗂️ **My Bookings** — Track all your past and upcoming bookings
- ➕ **Add Destinations** — Admin functionality to add new travel destinations
- ✏️ **Edit & Delete** — Manage existing destinations with modals and alerts
- 📱 **Responsive Design** — Fully responsive UI with Tailwind CSS

---

## 🔐 Security

Security is implemented across both frontend and backend:

- **Better Auth** handles session management, CSRF protection, and secure cookie-based authentication
- **Next.js middleware** protects frontend routes (e.g. `/profile`, `/my-bookings`, `/add-destinations`)
- **Express.js backend** validates authenticated sessions on all protected API endpoints
- **MongoDB** stores user and booking data securely with environment-variable-protected credentials
- All sensitive config is managed via `.env` files — never committed to source control

---

### Prerequisites

- Node.js `v18+`
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2. Install Dependencies

```bash
# Frontend
npm install

# Backend (if in a separate folder)
cd backend
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root (frontend):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://wanderlust:---------

GOOGLE_CLIENT_ID=your_id_here
GOOGLE_CLIENT_SECRET=your_secret_here
```

Create a `.env` file in your backend folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wanderlust:---------

BETTER_AUTH_SECRET=your_secret_here
CLIENT_URL=http://localhost:3000
```

### 4. Run the App

```bash
# Start frontend (Next.js)
npm run dev

# Start backend (Express)
node index.js
# or with nodemon:
nodemon index.js
```

Frontend runs at: `http://localhost:3000`  
Backend runs at: `http://localhost:5000`

---

## 📦 Key Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start Next.js development server |
| `npm run build` | Build for production             |
| `npm start`     | Start production server          |
| `npm run lint`  | Run ESLint                       |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

> Built with ❤️ using Next.js, Tailwind CSS, Express, MongoDB & Better Auth
