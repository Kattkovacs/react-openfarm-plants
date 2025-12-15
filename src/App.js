import React, { useEffect, useState, useRef, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

// Helper to get unique categories from plants
function getCategories(plants) {
  const categories = new Set();
  plants.forEach(plant => {
    if (plant.family) {
      categories.add(plant.family);
    }
  });
  return Array.from(categories);
}

// Plant Card component (clickable to view details)
function PlantCard({ plant }) {
  return (
    <Link to={`/plant/${plant.id}`} state={{ plant }} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, margin: 8, width: 220, cursor: "pointer", transition: "transform 0.2s", ":hover": { transform: "scale(1.05)" } }}>
        <h3>{plant.common_name}</h3>
        {plant.image_url && (
          <img
            src={plant.image_url}
            alt={plant.common_name}
            style={{ maxWidth: "100%", maxHeight: 160, minHeight: 160, minWidth: 213.859, objectFit: "cover", borderRadius: 4 }}
          />
        )}
        <p style={{ fontSize: 14 }}>{plant.scientific_name}</p>
        <p style={{ fontSize: 12, color: "#4b8656" }}>
          <b>Family:</b> {plant.family || "Unknown"}<br />
          <b>Genus:</b> {plant.genus || "Unknown"}
        </p>
      </div>
    </Link>
  );
}

// Plant Detail Page component
function PlantDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get plant data from location state
  const plant = location.state?.plant;

  if (!plant) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", background: "#f7fcf5", minHeight: "100vh", padding: "2rem" }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem", padding: "8px 16px", borderRadius: 4, border: "1px solid #4b8656", background: "white", cursor: "pointer", fontSize: 14 }}>
          ← Back
        </button>
        <div style={{ padding: "2rem", color: "red" }}>
          <p><b>Error:</b> Plant data not found. Please go back and click on a plant card.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f7fcf5", minHeight: "100vh", padding: "2rem" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem", padding: "8px 16px", borderRadius: 4, border: "1px solid #4b8656", background: "white", cursor: "pointer", fontSize: 14 }}>
        ← Back
      </button>
      
      <div style={{ maxWidth: 800, background: "white", padding: "2rem", borderRadius: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h1>{plant.common_name || "Unknown"}</h1>
        
        {plant.image_url && (
          <img src={plant.image_url} alt={plant.common_name} style={{ maxWidth: "100%", maxHeight: 400, objectFit: "contain", marginBottom: "1rem", borderRadius: 4 }} />
        )}
        
        <div style={{ marginBottom: "2rem" }}>
          <h2>Basic Information</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {plant.scientific_name && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Scientific Name:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.scientific_name}</td></tr>}
              {plant.family && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Family:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.family}</td></tr>}
              {plant.family_common_name && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Family Common Name:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.family_common_name}</td></tr>}
              {plant.genus && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Genus:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.genus}</td></tr>}
              {plant.rank && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Rank:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.rank}</td></tr>}
              {plant.status && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Status:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.status}</td></tr>}
            </tbody>
          </table>
        </div>

        {plant.author && (
          <div style={{ marginBottom: "2rem" }}>
            <h2>Botanical Information</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {plant.author && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Author:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.author}</td></tr>}
                {plant.year && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Year:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.year}</td></tr>}
                {plant.bibliography && <tr><td style={{ padding: 8, borderBottom: "1px solid #eee" }}><b>Bibliography:</b></td><td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{plant.bibliography}</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {plant.synonyms && plant.synonyms.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h2>Synonyms</h2>
            <ul style={{ columns: 2, columnGap: "2rem" }}>
              {plant.synonyms.map((syn, idx) => (
                <li key={idx}>{syn}</li>
              ))}
            </ul>
          </div>
        )}

        {plant.links && (
          <div style={{ marginBottom: "2rem" }}>
            <h2>Links</h2>
            <ul>
              {plant.links.self && <li><a href={plant.links.self} target="_blank" rel="noopener noreferrer">View Species</a></li>}
              {plant.links.plant && <li><a href={plant.links.plant} target="_blank" rel="noopener noreferrer">View Plant</a></li>}
              {plant.links.genus && <li><a href={plant.links.genus} target="_blank" rel="noopener noreferrer">View Genus</a></li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Plant List component
function PlantList() {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const mountedRef = useRef(true);

  // On mount: fetch some pages to build category list, but don't rely on this for UI pagination.
  useEffect(() => {
    mountedRef.current = true;
    async function fetchCategoriesPreview() {
      setError(null);
      try {
        let pagePreview = 1;
        let allPlants = [];
        let previewTotalPages = 1;
        while (pagePreview <= previewTotalPages && allPlants.length < 60) {
          const res = await fetch(`http://localhost:3001/api/crops?page=${pagePreview}`);
          if (!res.ok) throw new Error(`API returned status ${res.status}`);
          const data = await res.json();
          if (data && data.data) allPlants = allPlants.concat(data.data);
          if (data.meta && data.meta.total_pages) previewTotalPages = data.meta.total_pages;
          pagePreview += 1;
        }
        if (!mountedRef.current) return;
        setCategories(["All", ...getCategories(allPlants)]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategoriesPreview();
    return () => { mountedRef.current = false; };
  }, []);

  // Helper: load a page for the current category. If append is true, append to existing plants.
  const loadPage = useCallback(async (pageToLoad = 1, append = false, category) => {
    if (pageToLoad < 1) return;
    try {
      if (append) setIsFetchingMore(true); else setLoading(true);
      setError(null);
      const familyQuery = category && category !== "All" ? `&family=${encodeURIComponent(category)}` : "";
      const res = await fetch(`http://localhost:3001/api/crops?page=${pageToLoad}${familyQuery}`);
      if (!res.ok) throw new Error(`API returned status ${res.status}`);
      const data = await res.json();
      const newPlants = data && data.data ? data.data : [];
      console.log(data)
      if (append) {
        setPlants(prev => [...prev, ...newPlants]);
      } else {
        setPlants(newPlants);
      }
      if (data && data.meta && data.meta.total_pages) setTotalPages(data.meta.total_pages);
      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch plants. Please check your connection or CORS and try again.");
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  }, []);

  // Watch for category changes: reset and load first page for that category
  useEffect(() => {
    setPlants([]);
    setPage(1);
    setTotalPages(1);
    loadPage(1, false, selectedCategory);
  }, [selectedCategory, loadPage]);

  // Infinite scroll: load next page when near bottom
  useEffect(() => {
    function onScroll() {
      if (loading || isFetchingMore) return;
      if (page >= totalPages) return;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom) loadPage(page + 1, true, selectedCategory);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // include relevant deps
  }, [page, totalPages, loading, isFetchingMore, selectedCategory, loadPage]);
  

  const filteredPlants = selectedCategory === "All" ? plants : plants.filter(plant => plant.family === selectedCategory);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f7fcf5", minHeight: "100vh", padding: "2rem" }}>
      <h1>🌱 Plant Explorer</h1>
      <p>Browse plants by category. Click on a plant to see detailed information!</p>
      <label>
        <b>Filter by category:</b>
        <select
          style={{ marginLeft: 16, padding: 6, borderRadius: 4 }}
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      {loading ? (
        <p>Loading plants...</p>
      ) : error ? (
        <div style={{ color: "red", margin: "2rem 0" }}>
          <b>Error:</b> {error}
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 24 }}>
            {filteredPlants.length ? (
              filteredPlants.map(plant => (
                <PlantCard plant={plant} key={plant.id} />
              ))
            ) : (
              <p>No plants found in this category.</p>
            )}
          </div>
          {isFetchingMore && <p style={{ textAlign: "center", marginTop: 12 }}>Loading more...</p>}
        </>
      )}
    </div>
  );
}

// Main App with routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlantList />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
