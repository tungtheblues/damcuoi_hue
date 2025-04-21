import { motion } from "framer-motion";
import { useState } from "react";

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
}

interface BrideGroomInfo {
  brideName: string;
  groomName: string;
  brideImage: string;
  groomImage: string;
  coupleStory?: {
    date: string;
    title: string;
    description: string;
  }[];
}

interface ScheduleSectionProps {
  title?: string;
  events?: ScheduleEvent[];
  brideGroomInfo?: BrideGroomInfo;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const heartBeat = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const PersonInfo = ({ name, image }: { name: string; image: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="text-center md:mx-8 p-6 bg-rose-50/80 backdrop-blur-sm rounded-lg shadow-lg"
      variants={itemVariants}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        backgroundColor: "rgba(254, 242, 242, 0.95)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div
          initial={{ rotate: 0 }}
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-56 h-56 rounded-full border-2 border-dashed border-rose-200"></div>
        </motion.div>

        <motion.img
          src={image}
          alt={name}
          className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-rose-300 object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      </div>
      <motion.h3
        className="text-2xl font-serif font-semibold text-rose-800 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {name}
      </motion.h3>
      <motion.div
        className="text-rose-600 mt-2"
        variants={heartBeat}
        initial="initial"
        animate="animate"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-10 h-10 mx-auto"
          fill="currentColor"
        >
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const TimelineItem = ({ date, title, description, isLast = false }) => (
  <motion.div
    className="relative pl-8 pb-8"
    variants={itemVariants}
    whileInView={{ opacity: 1, x: 0 }}
    initial={{ opacity: 0, x: -10 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    {!isLast && (
      <div className="absolute left-0 top-0 h-full w-px bg-rose-200">
        <motion.div
          className="absolute top-0 left-0 w-px h-full bg-rose-400"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div>
    )}
    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-rose-400 -ml-2"></div>
    <div className="bg-white rounded-lg p-4 shadow-md">
      <span className="text-sm font-medium text-rose-500 block mb-1">
        {date}
      </span>
      <h4 className="text-lg font-medium text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const Couples = ({
  title = "Couples",
  brideGroomInfo = {
    brideName: "Huệ",
    groomName: "Vương",
    brideImage: "/images/gallery/photo8.jpg",
    groomImage: "/images/gallery/photo7.jpg",
    coupleStory: [
      {
        date: "May 2018",
        title: "First Met",
        description:
          "We first met at a friend's birthday party and instantly connected.",
      },
      {
        date: "December 2019",
        title: "First Date",
        description: "Our first official date was at a cozy café downtown.",
      },
      {
        date: "February 2021",
        title: "The Proposal",
        description: "The perfect sunset proposal on our favorite beach.",
      },
      {
        date: "October 2023",
        title: "Engagement",
        description:
          "We celebrated our engagement with close family and friends.",
      },
    ],
  },
}: ScheduleSectionProps) => {
  return (
    <section
      id="schedule"
      className="py-16 px-4 md:px-8 bg-rose-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-rose-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21c-1.2-1.2-5.5-4.8-7.5-7.5C2.5 10.5 2 8.5 2 7c0-2.5 2-4.5 4.5-4.5 1.5 0 3 1 3.5 2.5C10.5 3.5 12 2.5 13.5 2.5 16 2.5 18 4.5 18 7c0 1.5-.5 3.5-2.5 6.5-2 2.7-6.3 6.3-7.5 7.5z" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 text-rose-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21c-1.2-1.2-5.5-4.8-7.5-7.5C2.5 10.5 2 8.5 2 7c0-2.5 2-4.5 4.5-4.5 1.5 0 3 1 3.5 2.5C10.5 3.5 12 2.5 13.5 2.5 16 2.5 18 4.5 18 7c0 1.5-.5 3.5-2.5 6.5-2 2.7-6.3 6.3-7.5 7.5z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/4 text-rose-300 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21c-1.2-1.2-5.5-4.8-7.5-7.5C2.5 10.5 2 8.5 2 7c0-2.5 2-4.5 4.5-4.5 1.5 0 3 1 3.5 2.5C10.5 3.5 12 2.5 13.5 2.5 16 2.5 18 4.5 18 7c0 1.5-.5 3.5-2.5 6.5-2 2.7-6.3 6.3-7.5 7.5z" />
          </svg>
        </div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <motion.h2
            className="text-3xl md:text-4xl font-serif text-center text-rose-800 mb-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          <motion.div
            className="flex justify-center mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: "auto" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-24 h-1 bg-rose-300 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </motion.div>

        {/* Bride and Groom Information Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 mb-16"
          variants={containerVariants}
        >
          <PersonInfo
            name={brideGroomInfo.brideName}
            image={brideGroomInfo.brideImage}
          />

          {/* Connecting element between photos */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-3xl text-rose-600">&</span>
            </motion.div>
          </motion.div>

          <PersonInfo
            name={brideGroomInfo.groomName}
            image={brideGroomInfo.groomImage}
          />
        </motion.div>

        {/* Quote Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="relative py-8 px-6 md:px-12 bg-white rounded-lg shadow-md">
            <div className="absolute top-4 left-4 text-5xl leading-none text-rose-200">
              "
            </div>
            <div className="absolute bottom-4 right-4 text-5xl leading-none text-rose-200">
              "
            </div>
            <motion.p
              className="text-gray-700 italic text-center text-lg px-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Love is not about how many days, months, or years you have been
              together. Love is about how much you love each other every single
              day. */}
              Once upon a time, two souls found each other and created a
              beautiful journey together. From our first meeting to this special
              day, each moment has been a blessing.
            </motion.p>
          </div>
        </motion.div>

        {/* Love Story Timeline */}
        {/* <motion.div className="mb-16" variants={itemVariants}>
          <motion.h3
            className="text-2xl font-serif text-center text-rose-800 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Journey Together
          </motion.h3>

          <div className="relative pl-4">
            {brideGroomInfo.coupleStory?.map((story, index) => (
              <TimelineItem
                key={index}
                date={story.date}
                title={story.title}
                description={story.description}
                isLast={index === (brideGroomInfo.coupleStory?.length || 0) - 1}
              />
            ))}
          </div>
        </motion.div> */}

        {/* Final message */}
        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <motion.p
            className="text-gray-600 italic mb-4 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            We can't wait to celebrate with you!
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: [0, 10, 0], opacity: 1 }}
            transition={{
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
              opacity: { duration: 0.5 },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto text-rose-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Couples;
