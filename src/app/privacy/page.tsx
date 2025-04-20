import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for our e-commerce platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: June 1, 2023</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p>
            When you visit the Site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically-collected information as &quot;Device
            Information.&quot;
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">
            We collect Device Information using the following technologies:
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              &quot;Cookies&quot; are data files that are placed on your device
              or computer and often include an anonymous unique identifier. For
              more information about cookies, and how to disable cookies, visit{" "}
              <a
                href="http://www.allaboutcookies.org"
                className="text-black font-medium hover:underline"
              >
                http://www.allaboutcookies.org
              </a>
              .
            </li>
            <li>
              &quot;Log files&quot; track actions occurring on the Site, and
              collect data including your IP address, browser type, Internet
              service provider, referring/exit pages, and date/time stamps.
            </li>
            <li>
              &quot;Web beacons,&quot; &quot;tags,&quot; and &quot;pixels&quot;
              are electronic files used to record information about how you
              browse the Site.
            </li>
          </ul>

          <p className="mt-6">
            Additionally, when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information
            (including credit card numbers), email address, and phone number. We
            refer to this information as &quot;Order Information.&quot;
          </p>

          <p className="mt-4">
            When we talk about &quot;Personal Information&quot; in this Privacy
            Policy, we are talking both about Device Information and Order
            Information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. How We Use Your Personal Information
          </h2>
          <p>
            We use the Order Information that we collect generally to fulfill
            any orders placed through the Site (including processing your
            payment information, arranging for shipping, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Communicate with you;</li>
            <li>Screen our orders for potential risk or fraud;</li>
            <li>
              When in line with the preferences you have shared with us, provide
              you with information or advertising relating to our products or
              services.
            </li>
          </ul>

          <p className="mt-6">
            We use the Device Information that we collect to help us screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize our Site (for example, by
            generating analytics about how our customers browse and interact
            with the Site, and to assess the success of our marketing and
            advertising campaigns).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. Sharing Your Personal Information
          </h2>
          <p>
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. For example, we use
            Shopify to power our online store--you can read more about how
            Shopify uses your Personal Information here:{" "}
            <a
              href="https://www.shopify.com/legal/privacy"
              className="text-black font-medium hover:underline"
            >
              https://www.shopify.com/legal/privacy
            </a>
            . We also use Google Analytics to help us understand how our
            customers use the Site -- you can read more about how Google uses
            your Personal Information here:{" "}
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              className="text-black font-medium hover:underline"
            >
              https://www.google.com/intl/en/policies/privacy/
            </a>
            .
          </p>

          <p className="mt-4">
            Finally, we may also share your Personal Information to comply with
            applicable laws and regulations, to respond to a subpoena, search
            warrant or other lawful request for information we receive, or to
            otherwise protect our rights.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            4. Behavioral Advertising
          </h2>
          <p>
            As described above, we use your Personal Information to provide you
            with targeted advertisements or marketing communications we believe
            may be of interest to you. For more information about how targeted
            advertising works, you can visit the Network Advertising
            Initiative&apos;s (&quot;NAI&quot;) educational page at
            <a
              href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
              className="text-black font-medium hover:underline"
            >
              {" "}
              http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
            </a>
            .
          </p>

          <p className="mt-4">
            You can opt out of targeted advertising by using the links below:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/settings/?tab=ads"
                className="text-black font-medium hover:underline"
              >
                https://www.facebook.com/settings/?tab=ads
              </a>
            </li>
            <li>
              Google:{" "}
              <a
                href="https://www.google.com/settings/ads/anonymous"
                className="text-black font-medium hover:underline"
              >
                https://www.google.com/settings/ads/anonymous
              </a>
            </li>
            <li>
              Bing:{" "}
              <a
                href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                className="text-black font-medium hover:underline"
              >
                https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
              </a>
            </li>
          </ul>

          <p className="mt-4">
            Additionally, you can opt out of some of these services by visiting
            the Digital Advertising Alliance&apos;s opt-out portal at:{" "}
            <a
              href="http://optout.aboutads.info/"
              className="text-black font-medium hover:underline"
            >
              http://optout.aboutads.info/
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Do Not Track</h2>
          <p>
            Please note that we do not alter our Site&apos;s data collection and
            use practices when we see a Do Not Track signal from your browser.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
          <p>
            If you are a European resident, you have the right to access
            personal information we hold about you and to ask that your personal
            information be corrected, updated, or deleted. If you would like to
            exercise this right, please contact us through the contact
            information below.
          </p>

          <p className="mt-4">
            Additionally, if you are a European resident we note that we are
            processing your information in order to fulfill contracts we might
            have with you (for example if you make an order through the Site),
            or otherwise to pursue our legitimate business interests listed
            above. Additionally, please note that your information will be
            transferred outside of Europe, including to Canada and the United
            States.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Retention</h2>
          <p>
            When you place an order through the Site, we will maintain your
            Order Information for our records unless and until you ask us to
            delete this information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes</h2>
          <p>
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal or regulatory reasons.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Minors</h2>
          <p>The Site is not intended for individuals under the age of 16.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at privacy@example.com or by mail using the details
            provided below:
          </p>
          <address className="not-italic">
            <p>123 Privacy Street</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </address>
        </div>

        <div className="mt-10 pt-6 border-t">
          <p>
            By using our website, you acknowledge that you have read and
            understand this Privacy Policy.
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
