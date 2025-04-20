import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using our e-commerce platform.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-gray-600">Last updated: June 1, 2023</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            Please read these terms and conditions carefully before using our
            website. By accessing or using our platform, you agree to be bound
            by these Terms and Conditions and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Definitions</h2>
          <p>In these Terms and Conditions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot; refers to [Your Company Name], its subsidiaries,
              affiliates, and assigns.
            </li>
            <li>
              &quot;Website&quot; or &quot;Platform&quot; refers to our
              e-commerce website, including all content, services, and products
              available at or through the website.
            </li>
            <li>
              &quot;User&quot;, &quot;you&quot;, or &quot;your&quot; refers to
              any person who accesses or uses our Website.
            </li>
            <li>
              &quot;Products&quot; refers to any goods offered for sale on our
              Website.
            </li>
            <li>
              &quot;Content&quot; refers to text, images, photos, audio, video,
              and all other forms of data or communication on our Website.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this Website, you acknowledge that you have
            read, understood, and agree to be bound by these Terms and
            Conditions. If you do not agree to all of these terms, you are not
            authorized to use this Website.
          </p>
          <p>
            We reserve the right to update or modify these Terms and Conditions
            at any time without prior notice. Your continued use of the Website
            following the posting of any changes constitutes your acceptance of
            those changes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. Account Registration
          </h2>
          <p>
            To access certain features of the Website, you may be required to
            register for an account. You agree to provide accurate, current, and
            complete information during the registration process and to update
            such information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password and for restricting access to your computer.
            You agree to accept responsibility for all activities that occur
            under your account or password.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            4. Product Information and Pricing
          </h2>
          <p>
            We strive to provide accurate product descriptions and pricing
            information. However, we do not warrant that product descriptions,
            pricing, or other content on this Website is accurate, complete,
            reliable, current, or error-free.
          </p>
          <p>
            We reserve the right to refuse or cancel orders, whether or not the
            order has been confirmed and your payment processed. If your payment
            has already been processed, we will issue a refund.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            5. Orders and Payments
          </h2>
          <p>
            When you place an order through our Website, you are making an offer
            to purchase products. We may accept or decline your offer for any
            reason.
          </p>
          <p>
            Payment must be received prior to the acceptance of an order. We
            accept various payment methods as specified on our Website. By
            providing a payment method, you represent and warrant that you are
            authorized to use the designated payment method.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            6. Shipping and Delivery
          </h2>
          <p>
            We will make every effort to ship products in a timely manner.
            However, shipping times are estimates and not guaranteed. We are not
            responsible for shipping delays due to carrier issues, customs
            processing, or other circumstances beyond our control.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            7. Returns and Refunds
          </h2>
          <p>
            Our returns and refunds policy is outlined in detail in our
            dedicated
            <Link
              href="/returns"
              className="text-black font-medium hover:underline"
            >
              {" "}
              Returns Policy
            </Link>
            . By using our Website, you agree to be bound by the terms of this
            policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            8. Intellectual Property
          </h2>
          <p>
            All content included on this Website, such as text, graphics, logos,
            images, audio clips, digital downloads, data compilations, and
            software, is the property of the Company or its content suppliers
            and is protected by international copyright laws.
          </p>
          <p>
            You may not reproduce, distribute, display, sell, lease, transmit,
            create derivative works from, translate, modify, reverse-engineer,
            disassemble, decompile, or otherwise exploit this Website or any
            portion of it unless expressly permitted by the Company.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. User Content</h2>
          <p>
            By posting, uploading, or submitting any content to our Website, you
            grant us a non-exclusive, royalty-free, worldwide, perpetual, and
            irrevocable right to use, reproduce, modify, adapt, publish,
            translate, create derivative works from, distribute, and display
            such content.
          </p>
          <p>
            You represent and warrant that you own or have the necessary
            licenses, rights, consents, and permissions to use and authorize us
            to use all intellectual property rights in and to any content you
            submit.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            10. Disclaimer of Warranties
          </h2>
          <p>
            THE WEBSITE AND ALL PRODUCTS AND SERVICES DELIVERED TO YOU THROUGH
            THE WEBSITE ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT ANY WARRANTY OR REPRESENTATION, EXPRESS OR
            IMPLIED. THE COMPANY DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            11. Limitation of Liability
          </h2>
          <p>
            IN NO EVENT SHALL THE COMPANY, ITS OFFICERS, DIRECTORS, EMPLOYEES,
            OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
            LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
            RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR
            USE THE WEBSITE.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">12. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of [Your Country/State], without giving
            effect to any principles of conflicts of law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            13. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <address className="not-italic">
            <p>Email: legal@example.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>
              Address: 123 Legal Street
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
          </address>
        </div>

        <div className="mt-10 pt-6 border-t">
          <p>
            By using our website, you acknowledge that you have read and agree
            to these Terms and Conditions.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
