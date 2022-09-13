import { useEffect, useState } from "react";

import BasicInfo from "./BasicInfo";
import InfoSection from "./InfoSection";
import { getDetailsFromUrls } from "../../../utils";

const CharacterProfile = ({ character, setCharacterProfile }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      setError(null);
      const urls = [...character.films]
        .concat(character.starships)
        .concat(character.species);
      //
      const [data, error] = await getDetailsFromUrls(urls);
      if (error) {
        setError(error);
      } else {
        setDetails(data);
      }
      setLoading(false);
    };

    getDetails();
  }, [character]);

  if (error) return <p className="mx-4">Error getting character details</p>;
  if (loading)
    return (
      <p className="mx-4">
        Loading{" "}
        <span className="spinning inline-block" role="img">
          ⏳
        </span>
      </p>
    );

  return (
    <div className="mx-4">
      <button
        className="hover:underline"
        onClick={() => setCharacterProfile(null)}
      >
        <small>&#10229; back</small>
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mt-1 bg-gray-100 px-1 py-1.5">
        Profile
      </h1>

      <div className="grid grid-cols-4 mt-2">
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <BasicInfo character={character} />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <InfoSection title="Species" details={details.species} />
          <InfoSection title="Films" details={details.movies} />
          <InfoSection title="Starships Flown" details={details.starships} />
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;
