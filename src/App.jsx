function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* Barra superior */}
      <header style={{ padding: '20px', background: '#1a1a1a', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <h2 style={{ margin: 0, color: '#00ffcc' }}>BMV Labs - Control Central</h2>
        <div style={{ color: '#ffcc00' }}>Sistema en línea 🟢</div>
      </header>

      {/* Plano isométrico */}
      <main className="isometric-container">
        <div className="isometric-grid">
          
          {/* Sala de Desarrollo */}
          <div className="server-room">
            <div className="doctor-cube"></div>
            <div style={{ position: 'absolute', bottom: '-25px', left: '0', fontSize: '10px', textShadow: '1px 1px 0 #000' }}>Sala de Desarrollo</div>
          </div>

          {/* Mascota Misi */}
          <div className="misi-pet"></div>

        </div>
      </main>
      
    </div>
  );
}

export default App;
