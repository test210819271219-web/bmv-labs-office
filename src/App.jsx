import { useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño al de la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Función para dibujar un rombo (suelo isométrico)
    function drawIsoTile(x, y, size, color) {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.stroke();
    }

    // Dibujar el piso completo
    for (let row = -5; row < 5; row++) {
      for (let col = -5; col < 5; col++) {
        // Convertir coordenadas de cuadrícula a isométricas
        let isoX = (col - row) * 40 + centerX;
        let isoY = (col + row) * 20 + centerY;
        drawIsoTile(isoX, isoY, 40, '#1a1a1a');
      }
    }

    // Dibujar una "Sala" (Escritorio del Doctor)
    const drawDesk = (x, y) => {
      // Base del escritorio
      ctx.fillStyle = '#00ffcc';
      ctx.beginPath();
      ctx.moveTo(x, y - 15);
      ctx.lineTo(x + 30, y);
      ctx.lineTo(x, y + 15);
      ctx.lineTo(x - 30, y);
      ctx.closePath();
      ctx.fill();
      
      // Monitor de computadora (Pantalla)
      ctx.fillStyle = '#ff00ff';
      ctx.fillRect(x - 5, y - 10, 10, 8);
      
      // Persona (Avatar simple)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y + 5, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    // Dibujar algunas salas
    drawDesk(centerX - 100, centerY - 50);
    drawDesk(centerX + 100, centerY + 50);
    drawDesk(centerX, centerY - 120);

    // Dibujar a Misi (Mascota) caminando
    const drawMisi = (x, y) => {
      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      // Orejitas
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 5);
      ctx.lineTo(x - 2, y - 10);
      ctx.lineTo(x + 2, y - 5);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 5, y - 5);
      ctx.lineTo(x + 2, y - 10);
      ctx.lineTo(x - 2, y - 5);
      ctx.fill();
    };

    drawMisi(centerX + 50, centerY + 100);

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0a0a0a' }}>
      <header style={{ padding: '20px', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <h2 style={{ margin: 0, color: '#00ffcc', fontFamily: 'monospace' }}>BMV Labs - Control Central</h2>
        <div style={{ color: '#ffcc00', fontFamily: 'monospace' }}>Sistema en línea 🟢</div>
      </header>

      <main style={{ flex: 1, position: 'relative' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </main>
    </div>
  );
}

export default App;
