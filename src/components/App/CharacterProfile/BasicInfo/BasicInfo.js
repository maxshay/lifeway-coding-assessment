const BasicInfo = ({ character }) => {
  return (
    <div className="mb-4">
      <h1 className="text-lg font-bold text-gray-600 underline">Basic Info</h1>
      <p>
        <span className="font-bold">Name:</span> {character.name}
      </p>
      <p>
        <span className="font-bold">Height:</span> {character.height}
      </p>
      <p>
        <span className="font-bold">Weight:</span> {character.mass}
      </p>
      <p>
        <span className="font-bold">Hair:</span> {character.hair_color}
      </p>
      <p>
        <span className="font-bold">Skin Color:</span> {character.skin_color}
      </p>
      <p>
        <span className="font-bold">Eye Color:</span> {character.eye_color}
      </p>
      <p>
        <span className="font-bold">Dob:</span> {character.birth_year}
      </p>
      <p>
        <span className="font-bold">Gender:</span> {character.gender}
      </p>
    </div>
  );
};

export default BasicInfo;
