import React from 'react';

const ResponsiveTable = ({ headers, data }) => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: 'clamp(0.75rem, 3vw, 1rem)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)',
      margin: '0 auto',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <h3 style={{
        textAlign: 'center',
        color: '#764ba2',
        marginBottom: '1rem',
        fontSize: 'clamp(1rem, 3vw, 1.3rem)',
        fontWeight: '600',
        lineHeight: '1.2'
      }}>
        💌 Rangkuman Pesan Sayang 💌
      </h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)'
        }}>
          <thead>
            <tr style={{ 
              background: 'linear-gradient(135deg, #667eea, #764ba2)' 
            }}>
              {headers.map((header, i) => (
                <th key={i} style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  color: 'white',
                  fontWeight: '600',
                  textAlign: 'left',
                  minWidth: i === 0 ? '200px' : 'auto',
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)'
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{
                background: i % 2 === 0 ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                    color: j === 2 ? cell : '#333',
                    fontWeight: j === 2 ? 'bold' : 'normal',
                    fontSize: j === 1 ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(0.75rem, 2.5vw, 0.85rem)',
                    lineHeight: '1.4',
                    wordBreak: j === 0 ? 'break-word' : 'normal'
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{
        marginTop: '1rem',
        padding: '0.5rem',
        background: 'rgba(102, 126, 234, 0.05)',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <small style={{
          color: '#666',
          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
          fontStyle: 'italic'
        }}>
          💝 Total {data.length} pesan penuh cinta untuk kamu
        </small>
      </div>
    </div>
  );
};

export default ResponsiveTable;