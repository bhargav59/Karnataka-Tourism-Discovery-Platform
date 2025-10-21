import Head from "next/head";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms of Service - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Terms of service for using our platform"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 mb-6">
            Welcome to Karnataka Tourism Discovery. These terms and conditions
            outline the rules and regulations for the use of our website and
            services.
          </p>

          <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Karnataka Tourism Discovery if
            you do not agree to all of the terms stated here.
          </p>

          <h2 className="text-xl font-bold mb-3">2. Intellectual Property</h2>
          <p className="text-gray-700 mb-4">
            Unless otherwise stated, Karnataka Tourism Discovery and/or its
            licensors own the intellectual property rights for all material on
            this website. All intellectual property rights are reserved.
          </p>

          <h2 className="text-xl font-bold mb-3">3. User Content</h2>
          <p className="text-gray-700 mb-4">
            By submitting content to our platform, you grant us a worldwide,
            non-exclusive, royalty-free license to use, reproduce, adapt,
            publish, translate and distribute your content in any existing or
            future media.
          </p>

          <h2 className="text-xl font-bold mb-3">4. Prohibited Activities</h2>
          <p className="text-gray-700 mb-4">
            You are specifically restricted from all of the following:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>Publishing any website material in any other media</li>
            <li>
              Selling, sublicensing and/or otherwise commercializing any website
              material
            </li>
            <li>Publicly performing and/or showing any website material</li>
            <li>
              Using this website in any way that is or may be damaging to this
              website
            </li>
            <li>
              Using this website in any way that impacts user access to this
              website
            </li>
            <li>
              Using this website contrary to applicable laws and regulations
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-3">5. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            In no event shall Karnataka Tourism Discovery, nor its directors,
            employees, partners, agents, suppliers, or affiliates, be liable for
            any indirect, incidental, special, consequential or punitive
            damages, including without limitation, loss of profits, data, use,
            goodwill, or other intangible losses.
          </p>

          <h2 className="text-xl font-bold mb-3">6. Changes to These Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days' notice prior to any new terms taking effect.
          </p>

          <h2 className="text-xl font-bold mb-3">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at
            info@karnatakatourism.com.
          </p>
        </div>
      </main>
    </div>
  );
}
