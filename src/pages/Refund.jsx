import { refundCancellationPolicy } from "../data/refund";

function Refund() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <div className="md:py-14 py-6">
        <h1 className="text-3xl font-bold text-center">
          Refunds and Cancellation
        </h1>
      </div>
      {refundCancellationPolicy.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-base md:text-lg font-semibold text-blue-600 mb-1">
            {section.section}
          </h2>

          {typeof section.content === "string" && (
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {section.content}
            </p>
          )}

          {typeof section.content === "object" && (
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p>{section.content.contentTitle}</p>
              <ul className="list-disc list-inside ml-4">
                {section.content.contentList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p>{section.content.contentTitle2}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Refund;
