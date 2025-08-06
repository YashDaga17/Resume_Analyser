import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - CareerBoost',
  description: 'Get in touch with the CareerBoost team for support and inquiries',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                We're here to help you succeed in your career journey. Whether you have questions about our AI-powered resume analysis, need technical support, or want to share feedback, we'd love to hear from you.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">General Support</h3>
                  <a href="mailto:support@careerboost.app" className="text-blue-600 hover:underline">
                    support@careerboost.app
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Issues</h3>
                  <a href="mailto:tech@careerboost.app" className="text-blue-600 hover:underline">
                    tech@careerboost.app
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Inquiries</h3>
                  <a href="mailto:business@careerboost.app" className="text-blue-600 hover:underline">
                    business@careerboost.app
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Privacy & Legal</h3>
                  <a href="mailto:legal@careerboost.app" className="text-blue-600 hover:underline">
                    legal@careerboost.app
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How accurate is the AI analysis?</h3>
                  <p className="text-gray-700 text-sm">
                    Our AI provides comprehensive analysis based on industry best practices and current hiring trends. While highly accurate, we recommend using it as guidance alongside professional career advice.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Is my resume data secure?</h3>
                  <p className="text-gray-700 text-sm">
                    Yes, we take data security seriously. Your resume content is processed securely and not stored permanently. See our Privacy Policy for detailed information.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What file formats are supported?</h3>
                  <p className="text-gray-700 text-sm">
                    We support PDF, DOC, and DOCX formats. For best results, ensure your resume is text-readable (not just images).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Can I use this for different industries?</h3>
                  <p className="text-gray-700 text-sm">
                    Absolutely! Our AI is trained on diverse industry requirements and provides tailored recommendations based on your target field.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Response Time</h3>
              <p className="text-blue-800 text-sm">
                We typically respond to inquiries within 24-48 hours during business days. For urgent technical issues, please include "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
