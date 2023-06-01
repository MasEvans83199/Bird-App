import React from 'react';

const BirdInformation = ({ bird }) => {
  return (
    <div>
      <h3>{bird.genus} {bird.species}</h3>
      <div>
        <h4>Appearance</h4>
        <p>{bird.appearance}</p>
      </div>
      <div>
        <h4>Range</h4>
        <p>{bird.range}</p>
      </div>
      <div>
        <h4>Habitat</h4>
        <p>{bird.habitat}</p>
      </div>
      <div>
        <h4>Diet</h4>
        <p>{bird.diet}</p>
      </div>
      <div>
        <h4>Behavior</h4>
        <p>{bird.behavior}</p>
      </div>
      <div>
        <h4>Conservation</h4>
        <p>{bird.conservation}</p>
      </div>
      {bird.funFact && (
        <div>
          <h4>Fun Fact:</h4>
          <p>{bird.funFact}</p>
        </div>
      )}
    </div>
  );
};

export default BirdInformation;