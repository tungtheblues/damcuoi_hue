import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BankDetails {
  name: string;
  bankName: string;
  accountNumber: string;
  qrImage: string;
}

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftModal = ({ isOpen, onClose }: GiftModalProps) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setZoomedImage(imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2000);
      },
      (err) => console.error("Could not copy text: ", err)
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 80,
              duration: 0.1,
            }}
            className="relative bg-white overflow-hidden shadow-2xl w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-red-500 text-white p-4 flex items-center justify-center relative">
              <div className="inline-flex items-center">
                <h2 className="text-2xl font-bold">Thank You for Your Gift</h2>
              </div>

              {/* Close button */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 p-0">
              {/* Groom Section */}
              <div className="p-6 border border-gray-200">
                <h3 className="text-2xl font-bold text-center ">
                  Mừng Cưới Đến Chú Rể
                </h3>
                <p className="text-xs text-gray-500 text-center mb-4">
                  (Ấn vào hình để phóng to)
                </p>
                <div className="flex flex-col items-center space-y-6">
                  <div
                    className="w-56 h-56 mx-auto border p-1 cursor-pointer hover:border-blue-500 transition-all"
                    onClick={() =>
                      handleImageClick("/images/gallery/maqrTungsssss.JPG")
                    }
                  >
                    <img
                      src="/images/gallery/maqrTungsssss.JPG"
                      alt="QR Code for Groom"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-2 text-left w-full">
                    <p className="text-lg">
                      Ngân hàng: <span className="font-bold">Vietcombank</span>
                    </p>
                    <p className="text-lg">
                      Tên tài khoản: <span className="font-bold">VUONG</span>
                    </p>
                    <p className="text-lg flex items-center">
                      Số tài khoản:{" "}
                      <span className="font-bold mr-2">
                        00000000000000000000
                      </span>
                      <button
                        className="text-blue-500 hover:text-blue-700 focus:outline-none relative"
                        onClick={() => copyToClipboard("9865307195", "groom")}
                        aria-label="Copy account number"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        {copiedText === "groom" && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bride Section */}
              <div className="p-6 border border-gray-200">
                <h3 className="text-2xl font-bold text-center ">
                  Mừng Cưới Đến Cô Dâu
                </h3>
                <p className="text-xs text-gray-500 text-center mb-4">
                  (Ấn vào hình để phóng to)
                </p>
                <div className="flex flex-col items-center space-y-6">
                  <div
                    className="w-56 h-56 mx-auto border p-1 cursor-pointer hover:border-pink-500 transition-all"
                    onClick={() =>
                      handleImageClick("/images/gallery/maqrThao.jpg")
                    }
                  >
                    <img
                      src="/images/gallery/maqrThao.jpg"
                      alt="QR Code for Bride"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-2 text-left w-full">
                    <p className="text-lg">
                      Ngân hàng: <span className="font-bold">MB Bank</span>
                    </p>
                    <p className="text-lg">
                      Tên tài khoản:{" "}
                      <span className="font-bold">NGUYEN THI HUE</span>
                    </p>
                    <p className="text-lg flex items-center">
                      Số tài khoản:{" "}
                      <span className="font-bold mr-2">0834661615</span>
                      <button
                        className="text-pink-500 hover:text-pink-700 focus:outline-none relative"
                        onClick={() =>
                          copyToClipboard("19036067848018", "bride")
                        }
                        aria-label="Copy account number"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        {copiedText === "bride" && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Zoom Modal */}
          <AnimatePresence>
            {zoomedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
                onClick={closeZoom}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="relative max-w-3xl max-h-[90vh] p-2 bg-white rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black text-xl font-bold"
                    onClick={closeZoom}
                  >
                    ×
                  </button>
                  <img
                    src={zoomedImage}
                    alt="Zoomed QR Code"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftModal;
