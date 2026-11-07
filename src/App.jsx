import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

function App() {
  const gameRef = useRef(null);

  useEffect(() => {
    // Configuración del motor del juego
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#1a1a1a',
      parent: gameRef.current,
      physics: {
        default: 'arcade',
        arcade: { debug: false } // Ponlo en 'true' si quieres ver las cajas de colisión
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);
    let player;
    let cursors;
    let infoText;
    let isInZone = false;

    function preload() {
      // Generamos una textura cuadrada para el jugador sin usar imágenes externas
      const graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(0xff00ff, 1); // Color magenta
      graphics.fillRect(0, 0, 32, 32);
      graphics.generateTexture('player', 32, 32);
    }

    function create() {
      // 1. Dibujar el Suelo de la Oficina
      this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 800, 600, 0x2a2a2a).setStrokeStyle(4, 0x333333);
      
      // 2. Dibujar la "Sala de Desarrollo" (Zona interactiva)
      const devRoom = this.add.rectangle(window.innerWidth / 2 + 200, window.innerHeight / 2 - 100, 200, 150, 0x00ffcc, 0.2);
      devRoom.setStrokeStyle(2, 0x00ffcc);
      this.add.text(window.innerWidth / 2 + 120, window.innerHeight / 2 - 180, 'Sala de Desarrollo', { fontFamily: 'monospace', fontSize: '14px', color: '#00ffcc' });

      // 3. Dibujar Muebles (Escritorios)
      this.add.rectangle(window.innerWidth / 2 - 150, window.innerHeight / 2, 100, 50, 0x555555);
      this.add.text(window.innerWidth / 2 - 170, window.innerHeight / 2 - 10, 'Recepción', { fontFamily: 'monospace', fontSize: '12px', color: '#fff' });

      // 4. Crear al Jugador
      player = this.physics.add.sprite(window.innerWidth / 2 - 100, window.innerHeight / 2 + 100, 'player');
      player.setCollideWorldBounds(true);

      // 5. Controles
      cursors = this.input.keyboard.createCursorKeys();

      // 6. Texto de UI
      infoText = this.add.text(20, 20, 'Usa las flechas para moverte', { fontFamily: 'monospace', fontSize: '16px', color: '#ffffff' });

      // 7. Detectar si el jugador entra en la zona
      this.physics.add.overlap(player, devRoom, () => {
        if (!isInZone) {
          isInZone = true;
          infoText.setText('¡Estás en la Sala de Desarrollo! Iniciando debate...');
          infoText.setColor('#00ffcc');
          
          // Aquí luego conectaremos la IA. Por ahora simulamos un retraso.
          setTimeout(() => {
             if(isInZone) infoText.setText('Los 3 doctores están debatiendo tu código...');
          }, 2000);
        }
      }, null, this);
    }

    function update() {
      // Velocidad del jugador
      const speed = 200;
      player.setVelocity(0);

      if (cursors.left.isDown) {
        player.setVelocityX(-speed);
      } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
      }

      if (cursors.up.isDown) {
        player.setVelocityY(-speed);
      } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
      }

      // Si sale de la zona
      if (isInZone && (player.x < window.innerWidth / 2 + 100 || player.x > window.innerWidth / 2 + 300 || player.y < window.innerHeight / 2 - 175 || player.y > window.innerHeight / 2 - 25)) {
         isInZone = false;
         infoText.setText('Usa las flechas para moverte');
         infoText.setColor('#ffffff');
      }
    }

    // Limpieza cuando el componente se desmonta
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0a0a0a' }}>
      <header style={{ padding: '15px', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <h2 style={{ margin: 0, color: '#00ffcc', fontFamily: 'monospace' }}>BMV Labs - Oficina Virtual</h2>
        <div style={{ color: '#ffcc00', fontFamily: 'monospace' }}>Sistema en línea 🟢</div>
      </header>
      <div ref={gameRef} style={{ flex: 1, overflow: 'hidden' }} />
    </div>
  );
}

export default App;
