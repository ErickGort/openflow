# OpenData - System Visualization Tool

OpenData is a modern React application designed to visualize complex system integrations, data flows, and infrastructure maps. It provides multiple views to explore your organization's technology stack.

## Features

-   **Organic View**: An interactive, force-directed graph visualization of your system landscape.
-   **Architecture Diagram**: An auto-organized grid view grouping systems by category (Core, Data, Finance, etc.).
-   **Directory**: A searchable list of all connected systems with status and details.
-   **Schema Explorer**: A preview of your data warehouse schema (e.g., Snowflake).
-   **System Details**: Click on any node to view detailed information, health status, and sync metadata.

## Tech Stack

-   **Frontend**: React, Vite
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React, Simple Icons
-   **Linting**: ESLint

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ErickGort/openflow.git
    cd openflow
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser to `http://localhost:5173`.

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ArchitectureView.jsx
│   ├── BrandLogo.jsx
│   ├── DirectoryView.jsx
│   ├── OrbSystem.jsx
│   ├── SearchResults.jsx
│   ├── SnowflakeExplorer.jsx
│   └── SystemDetailPanel.jsx
├── data/
│   └── systems.js     # Static data for systems and integrations
├── App.jsx            # Main application layout
├── main.jsx           # Entry point
└── index.css          # Global styles and Tailwind directives
```

## Deployment

This project is built with Vite and can be easily deployed to any static hosting provider (Vercel, Netlify, GitHub Pages).

To build for production:

```bash
npm run build
```

The output will be in the `dist` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
