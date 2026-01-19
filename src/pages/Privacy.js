import Layout from "../components/Layout";

export default function Privacy() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Privacy Policy</h1>
                <p className="text-gray-400 mb-12 text-lg">Last Updated: January 18, 2026</p>

                <div className="prose prose-invert prose-lg max-w-none space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-300">
                            At Crossfade ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and billing information.</li>
                            <li><strong>Content Data:</strong> Video files, raw footage, scripts, and project descriptions that you upload.</li>
                            <li><strong>Usage Data:</strong> Information about your device, browser, and how you interact with our platform (e.g., pages visited, time spent).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-300">
                            We use the collected information for the following purposes:
                            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                <li>To facilitate the matching of Clients and Editors.</li>
                                <li>To process payments and refunds secureley.</li>
                                <li>To improve our platform functionality and user experience.</li>
                                <li>To send important notices, such as account updates and security alerts.</li>
                            </ul>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                        <p className="text-gray-300">
                            We implement industry-standard security measures to protect your data, including encryption of data in transit and at rest. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Sharing</h2>
                        <p className="text-gray-300">
                            We do not sell your personal data to third parties. We may share data with trusted service providers who assist us in operating our platform (e.g., payment processors like Stripe, cloud storage providers like AWS), provided they agree to keep this information confidential.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                        <p className="text-gray-300">
                            Depending on your location, you may have the right to access, correct, or delete your personal data. You can manage your account settings directly within the dashboard or contact us for assistance.
                        </p>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
