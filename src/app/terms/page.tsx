import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - CareerBoost',
  description: 'Terms of Service for CareerBoost - AI-Powered Career Assistant',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> August 4, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using CareerBoost, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                CareerBoost provides AI-powered resume analysis, career guidance, and professional development tools. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Resume analysis and optimization recommendations</li>
                <li>Interview preparation and practice questions</li>
                <li>Career roadmap planning</li>
                <li>Professional message templates</li>
                <li>Skills gap analysis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Use the service for lawful purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Not upload malicious files or content</li>
                <li>Not attempt to circumvent security measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Content and Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                You retain ownership of any content you upload to CareerBoost. By uploading content, you grant us a limited license to process and analyze your content for the purpose of providing our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                CareerBoost provides AI-generated recommendations and analysis. While we strive for accuracy, we cannot guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Employment outcomes or interview success</li>
                <li>Complete accuracy of all recommendations</li>
                <li>Suitability for all career situations</li>
                <li>Compatibility with all ATS systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                CareerBoost shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our service, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We strive to maintain high service availability but do not guarantee uninterrupted access. We may temporarily suspend service for maintenance, updates, or due to circumstances beyond our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-700">
                For questions regarding these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@careerboost.app" className="text-blue-600 hover:underline">
                  legal@careerboost.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
