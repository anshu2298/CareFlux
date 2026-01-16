import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] =
    useState("checking");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "healthy") {
          setBackendStatus("online");
        }
      })
      .catch(() => setBackendStatus("offline"));
  }, []);

  return (
    <div className='app-container'>
      <header className='hero'>
        <img
          src='/logo.png'
          alt='CareFlux Logo'
          className='app-logo'
        />
        <h1 className='title'>CareFlux</h1>
        <p className='subtitle'>
          Empowering modern care management with a seamless
          and intelligent workflow.
        </p>
        <div className={`status-badge ${backendStatus}`}>
          Backend Status:{" "}
          {backendStatus.charAt(0).toUpperCase() +
            backendStatus.slice(1)}
        </div>
      </header>

      <main className='card-grid'>
        <div className='card'>
          <h3>Frontend Ready</h3>
          <p>
            Vite + React (JavaScript) setup is complete.
            Start building your UI components in the{" "}
            <code>src</code> folder.
          </p>
          <button className='btn-primary'>
            Learn More
          </button>
        </div>

        <div className='card'>
          <h3>Backend Secure</h3>
          <p>
            Node.js and Express are configured with ES
            modules. API routes are ready for
            implementation.
          </p>
          <button className='btn-primary'>View Docs</button>
        </div>

        <div className='card'>
          <h3>Design System</h3>
          <p>
            Modern CSS variables and glassmorphism elements
            are integrated for a premium user experience.
          </p>
          <button className='btn-primary'>
            Explore Theme
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
