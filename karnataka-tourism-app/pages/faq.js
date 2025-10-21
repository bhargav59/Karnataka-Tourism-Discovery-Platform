import Head from "next/head";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Karnataka Tourism Discovery?",
      answer:
        "Karnataka Tourism Discovery is a comprehensive platform for discovering Karnataka's diverse attractions, from ancient temples and pilgrimage sites to modern quirky landmarks and offbeat experiences.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes, Karnataka Tourism Discovery is completely free to use. You can browse attractions, read reviews, and plan your trips without any cost.",
    },
    {
      question: "Do I need to create an account to use the platform?",
      answer:
        "You can browse attractions and read information without an account. However, you'll need to create an account to save favorites, write reviews, and submit new attractions.",
    },
    {
      question: "How can I submit a new attraction?",
      answer:
        "After creating an account and logging in, you can submit new attractions through the 'Submit Attraction' link in your profile. Our team will review submissions before publishing.",
    },
    {
      question: "How accurate is the information on the platform?",
      answer:
        "We strive to provide accurate and up-to-date information. However, attraction details like timings and fees may change. We recommend verifying critical information before visiting.",
    },
    {
      question: "Can I contribute photos to attractions?",
      answer:
        "Yes, logged-in users can contribute photos to attractions through the review system. All photos are reviewed before publication to ensure quality and appropriateness.",
    },
    {
      question: "How can I report incorrect information?",
      answer:
        "You can report incorrect information using the 'Report' button on attraction pages or by contacting us directly through our contact form.",
    },
    {
      question: "Is the platform available in languages other than English?",
      answer:
        "Currently, the platform is available in English. We plan to add support for Kannada and other regional languages in future updates.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FAQ - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Frequently asked questions about our platform"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 ${
                index === 0 ? "" : "border-t"
              }`}
            >
              <button className="flex justify-between items-center w-full p-6 text-left focus:outline-none">
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="px-6 pb-6 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Still have questions?</h2>
          <p className="text-gray-700 mb-4">
            If you can't find the answer you're looking for, please contact our
            support team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </main>
    </div>
  );
}
