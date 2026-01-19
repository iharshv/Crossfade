import Layout from "../components/Layout";

export default function Cookies() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Cookie Policy</h1>
                <p className="text-gray-400 mb-12 text-lg">Last Updated: January 18, 2026</p>

                <div className="prose prose-invert prose-lg max-w-none space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
                        <p className="text-gray-300">
                            Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work more efficiently and to provide information to the site owners.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Application of Cookies</h2>
                        <p className="text-gray-300 mb-4">We use the following types of cookies on Crossfade:</p>

                        <div className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h3 className="font-bold text-primary mb-2">Essential Cookies</h3>
                                <p className="text-sm text-gray-400">Necessary for the website to function. For example, cookies that allow you to log into secure areas of our site or use the shopping cart.</p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h3 className="font-bold text-secondary mb-2">Performance Cookies</h3>
                                <p className="text-sm text-gray-400">All information these cookies collect is aggregated and therefore anonymous. They help us understand how visitors interact with our website.</p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h3 className="font-bold text-white mb-2">Functional Cookies</h3>
                                <p className="text-sm text-gray-400">Enable the website to provide enhanced functionality and personalization, such as remembering your language preference or region.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Managing Cookies</h2>
                        <p className="text-gray-300">
                            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noreferrer" className="text-primary hover:text-white">www.aboutcookies.org</a>.
                        </p>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
