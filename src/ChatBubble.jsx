import React from 'react';

function ChatBubble({ message, side, avatarUrl }) {
  const bubbleStyle = {
    backgroundColor: side === 'left' ? '#e5e5ea' : '#2962ff',
    color: side === 'left' ? '#333' : '#fff',
    borderRadius: '20px',
    padding: '10px',
    maxWidth: '70%',
    marginBottom: '10px',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
  };

  const avatarStyle = {
    borderRadius: '60%',
    height: '60px',
    width: '60px',
    position: 'absolute',
    bottom: '-10px',
    left: side === 'left' ? '-60px' : 'calc(100% + 20px)',
    border: side === 'left' ? '2px solid #e5e5ea' : 'none',
  };

  return (
    <div style={bubbleStyle}>
      <img src={avatarUrl} alt="avatar" style={avatarStyle} />
      <div>{message}</div>
    </div>
  );
}

function ChatContainer({ children }) {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    return <div style={containerStyle}>{children}</div>;
  }

export {ChatBubble, ChatContainer};
