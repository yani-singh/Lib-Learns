const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto py-8 text-center">

        <h3 className="text-2xl font-bold text-[#556B2F]">
          Lib-Learn
        </h3>

        <p className="text-gray-500 mt-2">
          © 2026 Lib-Learn. All rights reserved.
        </p>

        <div className="flex justify-center gap-8 mt-5 text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Support</span>
          </div>

      </div>
    </footer>
  );
};

export default Footer;