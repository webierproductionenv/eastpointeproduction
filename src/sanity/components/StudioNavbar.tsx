import React from 'react';
import { NavbarProps } from 'sanity';

export function StudioNavbar(props: NavbarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Premium Back-to-site Info Bar */}
      <div style={{
        backgroundColor: '#2c1e1a',
        borderBottom: '1px solid rgba(212, 197, 176, 0.25)',
        padding: '8px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        {/* Left Side: Dynamic Greeting / Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#a67c52',
            borderRadius: '50%',
            display: 'inline-block',
            boxShadow: '0 0 8px #a67c52',
          }} />
          <span style={{
            fontSize: '11px',
            color: '#d4c5b0',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            East Pointe Content Studio
          </span>
        </div>

        {/* Right Side: Back to Public Website CTA */}
        <a 
          href="/" 
          style={{
            fontSize: '11px',
            color: '#2c1e1a',
            backgroundColor: '#a67c52',
            padding: '5px 14px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 4px rgba(44, 30, 26, 0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f0e6';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(245, 240, 230, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#a67c52';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(44, 30, 26, 0.15)';
          }}
        >
          <span>←</span> Return to Website
        </a>
      </div>

      {/* Render the default Sanity Navbar under our header */}
      {props.renderDefault(props)}
    </div>
  );
}

export default StudioNavbar;
