const InfoSection = ({ title, details = [] }) => {
  return (
    <div className="mb-4">
      <h1 className="text-lg font-bold text-gray-600 underline">{title}</h1>
      {(() => {
        if (details.length > 0)
          return details.map((el) => <p key={el}>{el}</p>);
        else return <p data-testid={`${title}-no-info`}>No Info</p>;
      })()}
    </div>
  );
};

export default InfoSection;
