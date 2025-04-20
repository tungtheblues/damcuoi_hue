import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

// Types
interface Message {
  name: string;

  message: string;
  timestamp: string;
}

// Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Hãy nhập tên của bạn" }),
  relation: z.string().optional(),
  attending: z.enum(["yes", "no"]),
  message: z.string().min(5, { message: "Hãy nhập lời chúc ít nhất 5 ký tự" }),
});

type FormValues = z.infer<typeof formSchema>;

// Default Messages
const defaultMessages: Message[] = [
  {
    name: "Ngọc",

    message:
      "Chúc hai bạn trăm năm hạnh phúc, trăm năm hòa hợp, trăm năm bên nhau. Mong rằng tình yêu của hai bạn sẽ mãi đẹp như ngày hôm nay!",
    timestamp: "2024-03-15T15:30:00Z",
  },
  {
    name: " Đức",

    message:
      "Chúc mừng hai bạn đã tìm thấy nhau. Chúc hai bạn xây dựng được một tổ ấm hạnh phúc, yêu thương và tin tưởng nhau trọn đời!",
    timestamp: "2024-03-16T10:15:00Z",
  },
  {
    name: "Nam",

    message:
      "Chúc hai bạn trăm năm hạnh phúc! Mong rằng tình yêu của hai bạn sẽ luôn bền chặt và ngày càng thăng hoa.",
    timestamp: "2024-03-18T08:45:00Z",
  },
  {
    name: "Thùy Dung",

    message:
      "Chúc mừng hạnh phúc! Mong hai bạn luôn nắm chặt tay nhau, cùng xây dựng một cuộc sống tràn ngập tiếng cười.",
    timestamp: "2024-03-20T14:20:00Z",
  },
  {
    name: "Quang",

    message:
      "Chúc hai bạn trăm năm hạnh phúc, luôn yêu thương, che chở và nâng đỡ nhau trên những chặng đường phía trước!",
    timestamp: "2024-03-22T19:10:00Z",
  },
];

// Components
const ThankYouMessage = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-8 rounded-lg shadow-md text-center"
  >
    <div className="text-rose-600 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <h3 className="text-2xl font-serif text-rose-800 mb-4">Cảm ơn bạn!</h3>
    <p className="text-gray-600 mb-6">
      Lời chúc của bạn đã được gửi thành công. Chúng tôi rất trân trọng những
      lời chúc tốt đẹp của bạn!
    </p>
    <button
      onClick={onReset}
      className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md transition-colors"
    >
      Gửi lời chúc khác
    </button>
  </motion.div>
);

const MessageList = ({ messages }: { messages: Message[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    viewport={{ once: true }}
    className="bg-white p-6 md:p-8 rounded-lg shadow-md"
  >
    <h3 className="text-2xl font-serif text-rose-800 mb-6 text-center">
      Lời chúc từ bạn bè
    </h3>
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-gray-100">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="p-4 border border-rose-200 hover:border-rose-300 transition-colors rounded-lg bg-rose-50/50">
            <p className="italic text-gray-600 mb-2">"{msg.message}"</p>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-rose-700">— {msg.name}</p>
              {/* {msg.timestamp && (
                <p className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleDateString()}
                </p>
              )} */}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
// mmm

const RSVPForm = ({ onSubmit }: { onSubmit: (data: FormValues) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      relation: "",
      attending: "yes",
      message: "",
    },
  });

  const submitForm = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit(data);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white p-6 md:p-8 rounded-lg shadow-md"
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nhập tên <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nhập tên của bạn"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-300 focus:ring-red-200"
                  : "border-rose-200 focus:ring-rose-200"
              }`}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="relation">
              Mối quan hệ
            </label>
            <input
              id="relation"
              type="text"
              placeholder="(Bạn của cô dâu, chú rể...)"
              className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200"
              {...register("relation")}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-gray-700 mb-2">
            Xác nhận tham dự? <span className="text-rose-500">*</span>
          </label>
          <div className="flex space-x-8">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="attending-yes"
                value="yes"
                className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                {...register("attending")}
              />
              <label
                htmlFor="attending-yes"
                className="text-gray-700 cursor-pointer"
              >
                Tham dự
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="attending-no"
                value="no"
                className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                {...register("attending")}
              />
              <label
                htmlFor="attending-no"
                className="text-gray-700 cursor-pointer"
              >
                Không tham dự
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Lời chúc của bạn <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Nhập lời chúc của bạn tại đây"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none h-24 ${
              errors.message
                ? "border-red-300 focus:ring-red-200"
                : "border-rose-200 focus:ring-rose-200"
            }`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          ></textarea>
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white px-8 py-2 rounded-md transition-colors flex items-center justify-center mx-auto"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang gửi...
              </>
            ) : (
              "Gửi lời chúc"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Main Component
interface RSVPSectionProps {
  id?: string;
  className?: string;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({
  id = "rsvp",
  className = "",
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);

  const handleSubmit = (data: FormValues) => {
    // Create new message with current timestamp
    const newMessage: Message = {
      name: data.name,

      message: data.message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [newMessage, ...prev]);
    setIsSubmitted(true);
  };

  return (
    <section
      id={id}
      className={`py-16 px-4 md:px-8 bg-rose-50 min-h-[600px] ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif text-rose-800 mb-4">
            Gửi lời chúc
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Cảm ơn bạn rất nhiều vì đã gửi những lời chúc tốt đẹp đến chúng tôi!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            {isSubmitted ? (
              <ThankYouMessage onReset={() => setIsSubmitted(false)} />
            ) : (
              <RSVPForm onSubmit={handleSubmit} />
            )}
          </div>
          <div className="lg:w-1/2">
            <MessageList messages={messages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
