import React, { useState } from 'react';
import BirdInformation from './BirdInformation';

const Birds = ({}) => {
  const birds = [
    {
      name: 'American Goldfinch',
      genus: 'Spinus',
      species: 'tristis',
      appearance: 'The American Goldfinch is a small bird, about 4.5 to 5 inches (11 to 13 centimeters) in length. The males have bright yellow plumage during the breeding season, with black wings and a black cap on their heads. In winter, their plumage becomes a duller olive-brown color. Females have a similar olive-brown coloration year-round.',
      range: 'American Goldfinches are found throughout North America, from southern Canada to Mexico.',
      habitat: 'They inhabit a variety of habitats, including open fields, meadows, orchards, and gardens. They are particularly attracted to areas with abundant thistle and sunflower plants.',
      diet: 'These finches are primarily seed eaters. Their diet consists mainly of seeds from various plants, such as sunflowers, thistles, and dandelions. They are also known to eat small insects and occasionally feed on fruits.',
      behavior: 'These finches are known for their acrobatic flight and cheerful, warbling song. They often gather in flocks outside of the breeding season and can be seen flying in a distinctive undulating pattern. American Goldfinches are also highly social and often feed together in groups.',
      conservation: 'The American Goldfinch is a common and widespread species, and its population appears to be stable. They are not considered threatened or endangered. Their adaptability to various habitats and their ability to utilize different food sources have contributed to their conservation status.',
      funFact: 'The American Goldfinch is the only bird in the world to have a distinctive wingspan of 5 feet (1.6 meters).',
    },
    {
       name: 'Atlantic Puffin',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Atlantic_Puffin_%28Aptenodytes_forsteri%29_male_%28cropped%29',
      genus: 'Fratercula',
      species: 'arctica',
      appearance: 'The Atlantic Puffin is a small to medium-sized seabird, measuring about 10 inches (25 centimeters) in length. It has a distinctive appearance with a colorful beak, bright orange legs, and a black back and wings. During the breeding season, adults develop a white face with a black crown and a vibrant triangular beak. In winter, their face becomes darker, and the beak loses its bright colors.',
      range: 'Atlantic Puffins breed along the rocky coastlines of the North Atlantic Ocean.',
      habitat: 'They are found in several countries, including Iceland, Norway, the United Kingdom, Canada, and the northeastern United States. They spend most of their lives at sea but come ashore during the breeding season to nest in colonies on coastal cliffs or islands.',
      diet: 'Puffins are specialized hunters of small fish, primarily sand eels, herring, and capelin. They catch their prey by diving into the water from the air, using their wings to "fly" underwater. Puffins can hold multiple fish in their beaks, allowing them to bring food back to their chicks.',
      behavior: 'Puffins are excellent swimmers and agile flyers, but their walking ability on land is somewhat clumsy. They are known for their distinctive appearance and comical behavior, often waddling on land and flapping their wings while "parading" in front of their burrows. Puffins are social birds and gather in large colonies during the breeding season.',
      conservation: 'While the Atlantic Puffin is not currently considered globally threatened, some local populations have experienced declines due to various factors, including habitat degradation, climate change, and overfishing affecting their prey availability. Conservation efforts and protected areas have been established to safeguard their breeding sites and ensure their long-term survival.',
      funFact: 'Atlantic Puffins are excellent divers and can plunge underwater to depths of up to 200 feet (60 meters) in search of food. To protect their eyes from the impact of hitting the water, they have a specialized hinge joint in their beak that allows them to open their mouths wide while keeping their eyes closed. This unique adaptation helps them catch fish more effectively and avoid injury while diving.',
    },
    {
      name: 'Bald Eagle',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bald',
      genus: 'Haliaeetus',
      species: 'leucocephalus',
      appearance: 'The Bald Eagle is a large bird of prey, with a wingspan that can reach up to 7 feet (2.1 meters) and a length of about 2.5 to 3 feet (76 to 92 centimeters). Adults have a distinctive white head and tail, contrasting with their dark brown body. Juveniles have mostly brown plumage with mottled white markings.',
      range: 'The Bald Eagle is native to North America and can be found throughout the continent.',
      habitat: 'They inhabit a variety of habitats, including coastal areas, rivers, lakes, and marshes. They build their nests in tall trees near bodies of water.',
      diet: 'Bald Eagles are opportunistic hunters and primarily feed on fish. They also scavenge carrion and will prey on small mammals, waterfowl, and occasionally larger birds. They are skilled hunters, using their sharp talons to catch and carry their prey.',
      behavior: 'Bald Eagles are known for their impressive flying skills. They can reach speeds of up to 30 to 40 miles per hour (48 to 64 kilometers per hour) during flight and soar at even higher altitudes. They are also known for their distinctive call, which is a high-pitched, shrill whistle.',
      conservation: 'The Bald Eagle has made a remarkable recovery in recent decades. Once endangered due to habitat loss, pollution, and hunting, conservation efforts, including the banning of the pesticide DDT, have led to a significant increase in their population. Today, the Bald Eagle is no longer listed as endangered and is considered a conservation success story.',
      funFact: 'The Bald Eagle is not actually bald! The name "bald" comes from the Old English word "balde," which means "white-headed." The mature bird`s white-feathered head gives the illusion of baldness, while the rest of its body has dark feathers.',
    },
    {
      name: 'Baltimore Oriole',
      genus: 'Icterus',
      species: 'galbula',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Baltimore_',
      appearance: 'The Baltimore Oriole is a vibrant and colorful songbird. Males have bright orange plumage on their underparts, head, and shoulders, while their wings and tail are black. Females are more subdued in color, with a pale orange or yellowish underbody and gray-brown wings and back.',
      range: 'The Baltimore Oriole is native to North America and can be found in the eastern and central parts of the continent during the breeding season.',
      habitat: 'They inhabit open woodlands, forest edges, and shade trees in parks and gardens. They are known to migrate to Central America and the Caribbean during the winter.',
      diet: 'Baltimore Orioles primarily feed on insects, spiders, and other arthropods during the breeding season. They also have a sweet tooth and are attracted to nectar, fruits, and sugary offerings like oranges or jelly feeders. They use their slender, pointed beaks to extract nectar and insects from flowers or fruits.',
      behavior: 'Baltimore Orioles are known for their melodious and flute-like songs, which they use to communicate and establish territories. They have a distinctive and beautiful vocalization. They are agile fliers and can be seen flitting between tree branches or flying in a direct, rapid manner.',
      conservation: 'Baltimore Orioles have stable populations and are not currently considered threatened. However, habitat loss and fragmentation can impact their breeding success. Providing suitable nesting sites, preserving natural habitats, and offering food sources can help support their populations.',
      funFact: 'The Baltimore Oriole is named after the colors of Lord Baltimore, an English nobleman who used a similar orange and black color scheme on his coat of arms. Its vibrant orange plumage reminded early settlers of the colors of the Lord, leading to its association with Baltimore in its common name.'
    },
    {
      name: 'Golden Eagle',
      image: '../src/bird_photos/golden_eagle2.png',
      genus: 'Aquila',
      species: 'chrysaetos',
      appearance: 'The golden eagle is a brown bird of prey with a wingspan of up to seven feet.',
      range: 'Mountainous regions of North America, Eurasia, and northern Africa',
      habitat: 'Near cliffs and mountains',
      diet: 'Small mammals such as rabbits and hares',
      behavior: 'Golden eagles are known for their impressive hunting abilities and can take down prey much larger than themselves.',
      conservation: 'Least concern',
      funFact: 'The golden eagle is one of the fastest birds in the world, reaching speeds of up to 200 mph when diving.',
    },
  ];

  const [selectedBird, setSelectedBird] = useState('');

  const handleShowInfo = (birdName) => {
    setSelectedBird(selectedBird === birdName ? '' : birdName);
  };

  return (
    <div>
      <h1>Birds</h1>

      {birds.map((bird, index) => (
        <div key={index}>
          <h2>{bird.name}</h2>
          <img src={bird.image} alt={bird.name} />
          <br></br>
          <button onClick={() => handleShowInfo(bird.name)}>Show Bird Info</button>
          {selectedBird === bird.name && <BirdInformation bird={bird} />}
        </div>
      ))}
    </div>
  );
};

export default Birds;