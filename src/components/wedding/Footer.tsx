import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rose-50 text-gray-700  px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="my-3 h-px bg-rose-200"></div>

        <div className="text-center">
          {/* <p>
            &copy; {currentYear} Sarah & Michael's Wedding. All rights reserved.
          </p> */}
          <p className="text-md font-bold text-rose-500 italic flex items-center justify-center gap-1">
            Made with{" "}
            <Heart className="h-3 w-3 fill-rose-500 animate-[beat_1s_ease-in-out_infinite]" />{" "}
            by the groom!
          </p>
        </div>
        <div className="my-3 h-px bg-rose-200"></div>
      </div>
    </footer>
  );
};

export default Footer;
