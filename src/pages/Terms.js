import Layout from "../components/Layout";

export default function Terms() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Terms of Service</h1>
                <p className="text-gray-400 mb-12 text-lg">Last Updated: January 18, 2026</p>

                <div className="prose prose-invert prose-lg max-w-none space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-300">
                            By accessing and using the Crossfade platform ("Service"), available at crossfade.media, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity, its affiliates, and all users who access the Service through your account to these terms and conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                        <p className="text-gray-300">
                            Crossfade provides a marketplace connecting video creators ("Clients") with professional video editors ("Editors"). We provide tools for project management, file transfer, communication, and secure payment processing. We reserve the right to modify, suspend, or discontinue the Service at any time for any reason with or without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                        <p className="text-gray-300">
                            You must register for an account to access certain features of the Service. You agree to provide accurate, current, and complete information during the registration process and to keep such information updated. You are responsible for safeguarding your password and for all activities that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
                        <p className="text-gray-300">
                            <strong>Project Escrow:</strong> Clients are required to fund a project's budget into Escrow before an Editor begins work. Funds are released to the Editor upon Client approval of the final deliverable.
                            <br /><br />
                            <strong>Service Fees:</strong> Crossfade charges a standard service fee of 10% on all transactions to cover platform maintenance, payment processing, and support.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property Rights</h2>
                        <p className="text-gray-300">
                            Upon full payment, the Client owns all rights, title, and interest in and to the final deliverables created by the Editor. The Editor retains the right to use the work in their portfolio unless a Non-Disclosure Agreement (NDA) has been signed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-300">
                            To the maximum extent permitted by law, Crossfade shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                        <p className="text-gray-300">
                            If you have any questions about these Terms, please contact us at <a href="mailto:info@crossfademedia.in" className="text-primary hover:text-white transition-colors">info@crossfademedia.in</a>.
                        </p>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
