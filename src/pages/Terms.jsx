import { termsData } from "../data/terms";

function Terms() {
  return (
    <div className="container mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold md:py-20 py-8 text-center">
          Terms & Conditions
        </h1>
      </div>
      {termsData.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-base md:text-lg font-semibold text-blue-600 mb-1">
            {section.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Terms;
