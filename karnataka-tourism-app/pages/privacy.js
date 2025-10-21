import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy - Karnataka Tourism Discovery</title>
        <meta name="description" content="Privacy policy for our platform" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 mb-6">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use our
            services.
          </p>

          <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information you provide directly to us, such as when you
            create an account, submit content, or contact us. This may include
            your name, email address, and any other information you choose to
            provide.
          </p>

          <h2 className="text-xl font-bold mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and respond to your requests</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2 className="text-xl font-bold mb-3">3. Information Sharing</h2>
          <p className="text-gray-700 mb-4">
            We do not share your personal information with third parties except
            in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect the rights and safety of our users</li>
            <li>
              With service providers who assist us in operating our platform
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-bold mb-3">5. Data Retention</h2>
          <p className="text-gray-700 mb-4">
            We retain your personal information for as long as necessary to
            provide our services and fulfill the purposes outlined in this
            policy, unless a longer retention period is required by law.
          </p>

          <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the right to access, update, or delete your personal
            information at any time. You may also have the right to object to or
            restrict certain processing of your information.
          </p>

          <h2 className="text-xl font-bold mb-3">7. Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>

          <h2 className="text-xl font-bold mb-3">8. Children's Privacy</h2>
          <p className="text-gray-700 mb-4">
            Our service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13.
          </p>

          <h2 className="text-xl font-bold mb-3">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>

          <h2 className="text-xl font-bold mb-3">10. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact
            us at info@karnatakatourism.com.
          </p>
        </div>
      </main>
    </div>
  );
}
