import React from 'react';
import { useNode } from '@craftjs/core';

export const SplitHero = ({
  primaryColor = '#90dc8c',
  secondaryColor = '#b65b5b',
  leftBgColor = '#f5e6d3',
  title = 'Personalized Benefits Administration That Puts You First',
  description = 'At 121 Benefits, we believe benefits should work for people, not the other way around. Our dedicated, one-on-one service model ensures every client feels like our only client...',
  buttonText = 'Button',
  videoHeight = 400,
  padding = 40,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        display: 'flex',
        minHeight: '600px',
        width: '100%',
      }}
    >
      {/* Left Side - Illustration Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: leftBgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${padding}px`,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '500px',
            height: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
          }}
        >
          Illustration Area
        </div>
      </div>

      {/* Right Side - Content Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: secondaryColor,
          display: 'flex',
          flexDirection: 'column',
          padding: `${padding}px`,
          gap: '20px',
        }}
      >
        {/* Title and Description */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              color: '#333',
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '16px',
              lineHeight: '1.3',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: '#fff',
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '20px',
            }}
          >
            {description}
          </p>
          <button
            style={{
              backgroundColor: primaryColor,
              color: '#333',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {buttonText}
          </button>
        </div>

        {/* Video Container */}
        <div
          style={{
            width: '100%',
            height: `${videoHeight}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '18px',
          }}
        >
          Video Player Area
        </div>

        {/* Thumbnails Carousel */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left Arrow */}
          <button
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            ‹
          </button>

          {/* Thumbnails */}
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              style={{
                width: '120px',
                height: '80px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '12px',
              }}
            >
              Video {index}
            </div>
          ))}

          {/* Right Arrow */}
          <button
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

const SplitHeroSettings = () => {
  const {
    actions: { setProp },
    primaryColor,
    secondaryColor,
    leftBgColor,
    title,
    description,
    buttonText,
    videoHeight,
    padding,
  } = useNode((node) => ({
    primaryColor: node.data.props.primaryColor,
    secondaryColor: node.data.props.secondaryColor,
    leftBgColor: node.data.props.leftBgColor,
    title: node.data.props.title,
    description: node.data.props.description,
    buttonText: node.data.props.buttonText,
    videoHeight: node.data.props.videoHeight,
    padding: node.data.props.padding,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Split Hero Settings</h3>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Primary Color (Button):
        </label>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setProp((props) => (props.primaryColor = e.target.value))}
          style={{ width: '100%', height: '40px', cursor: 'pointer' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Secondary Color (Right BG):
        </label>
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => setProp((props) => (props.secondaryColor = e.target.value))}
          style={{ width: '100%', height: '40px', cursor: 'pointer' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Left Background Color:
        </label>
        <input
          type="color"
          value={leftBgColor}
          onChange={(e) => setProp((props) => (props.leftBgColor = e.target.value))}
          style={{ width: '100%', height: '40px', cursor: 'pointer' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setProp((props) => (props.title = e.target.value))}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setProp((props) => (props.description = e.target.value))}
          style={{ width: '100%', padding: '8px', fontSize: '14px', minHeight: '80px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Button Text:
        </label>
        <input
          type="text"
          value={buttonText}
          onChange={(e) => setProp((props) => (props.buttonText = e.target.value))}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Video Container Height:
        </label>
        <input
          type="number"
          value={videoHeight}
          onChange={(e) => setProp((props) => (props.videoHeight = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Padding:</label>
        <input
          type="number"
          value={padding}
          onChange={(e) => setProp((props) => (props.padding = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>
    </div>
  );
};

SplitHero.craft = {
  displayName: 'Split Hero',
  props: {
    primaryColor: '#90dc8c',
    secondaryColor: '#b65b5b',
    leftBgColor: '#f5e6d3',
    title: 'Personalized Benefits Administration That Puts You First',
    description:
      'At 121 Benefits, we believe benefits should work for people, not the other way around. Our dedicated, one-on-one service model ensures every client feels like our only client...',
    buttonText: 'Button',
    videoHeight: 400,
    padding: 40,
  },
  related: {
    settings: SplitHeroSettings,
  },
};
