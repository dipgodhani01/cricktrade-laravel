import { aboutData } from "../data/about";

function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      {aboutData.map((section, index) => {
        if (section.type === "heading") {
          return (
            <h2
              key={index}
              className="text-3xl font-bold mb-6 text-center text-blue-600"
            >
              {section.content}
            </h2>
          );
        }

        if (section.type === "paragraph") {
          return (
            <p key={index} className="mb-6 text-lg leading-relaxed">
              {section.content}
            </p>
          );
        }

        if (section.type === "list") {
          return (
            <ul key={index} className="list-disc pl-6 space-y-4">
              {section.items.map((item, i) => (
                <li key={i} className="text-base text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}

export default AboutUs;
