import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegClock,
} from "react-icons/fa";

function ContactUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 min-h-[calc(100vh-320px)]">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start space-x-4">
          <FaPhoneAlt className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              WhatsApp/Call
            </h2>
            <p className="text-blue-600 hover:underline cursor-pointer">
              +91 9358396851
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start space-x-4">
          <FaEnvelope className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <p className="text-blue-600 hover:underline cursor-pointer">
              cricktrade@gmail.com
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start space-x-4">
          <FaMapMarkerAlt className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <p className="text-gray-700">
              201, 2nd Floor, Shreeji Arcade, VIP Road, Vesu, <br />
              Surat, Gujarat 395007
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start space-x-4">
          <FaRegClock className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Working Hours
            </h2>
            <p className="text-gray-700">9:00 - 23:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
