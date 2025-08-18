import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegClock,
} from "react-icons/fa";

function ContactUs() {
  const contactDetails = [
    {
      icon: <FaPhoneAlt />,
      title: "WhatsApp / Call",
      value: "+91 9358396851",
      link: "tel:+919358396851",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "cricktrade@gmail.com",
      link: "mailto:cricktrade@gmail.com",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      value: `201, 2nd Floor, Shreeji Arcade, VIP Road, Vesu,
              Surat, Gujarat 395007`,
      link: "https://goo.gl/maps/xyz",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: <FaRegClock />,
      title: "Working Hours",
      value: "9:00 AM - 11:00 PM",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-293px)]">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Contact <span className="text-blue-500">Us</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4">
        {contactDetails.map((item, index) => (
          <div
            key={index}
            className="bg-white sm:p-6 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex sm:flex-row flex-col sm:items-start items-center sm:space-x-5 border border-gray-100"
          >
            <div
              className={`flex items-center justify-center min-h-14 min-w-14 rounded-full bg-gradient-to-r ${item.color} text-white text-xl shadow-md mb-2`}
            >
              {item.icon}
            </div>
            <div className="sm:text-start text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h2>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-700">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs;
