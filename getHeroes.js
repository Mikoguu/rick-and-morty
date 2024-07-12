export async function getHeroes() {
	try {
	  const response = await fetch('https://rickandmortyapi.com/api/character');
	  const heroes = await response.json();
		
	  return heroes;
	} catch (err) {
	  console.log(err.message); 
	}
  };
