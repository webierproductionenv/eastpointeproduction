import React from 'react';

export function BrandLogo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '4px 8px',
    }}>
      {/* Brand Logo Image */}
      <img
        src="/logo.avif"
        alt="East Pointe Logo"
        style={{
          height: '28px',
          width: 'auto',
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />
      {/* Brand Title Text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <span style={{
          fontSize: '13px',
          fontWeight: 'bold',
          letterSpacing: '0.15em',
          fontFamily: 'Georgia, serif',
          color: '#f5f0e6',
          lineHeight: '1.2',
        }}>
          EAST POINTE
        </span>
        <span style={{
          fontSize: '7.5px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontWeight: '600',
          color: '#d4c5b0',
          lineHeight: '1',
        }}>
          Studio Admin
        </span>
      </div>
    </div>
  );
}

export default BrandLogo;
