const Card = ({ main, primary = false, description = "" }: { main: string; primary?: boolean; description?: string }) => {
  const cardClass = `w-60 h-80 p-7 rounded-lg shadow-lg text-center ${
    primary ? "bg-primary" : "bg-socendery"
  }`;

  return (
    <div className={cardClass}>
      <h3 className="text-fourth text-4xl font-bold mb-4">{main}</h3>
      {description && <p className="text-fourth text-lg font-normal">{description}</p>}
    </div>
  );
};

export default Card;