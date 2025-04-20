import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Returns & Refunds Policy",
  description: "Returns and refunds policy for our e-commerce platform.",
};

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Returns & Refunds Policy</h1>
          <p className="text-gray-600">Last updated: June 1, 2023</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            We want you to be completely satisfied with your purchase. If
            you&apos;re not entirely happy, we&apos;re here to help.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. Return Eligibility
          </h2>
          <p>
            To be eligible for a return, your item must be unused and in the
            same condition that you received it. It must also be in the original
            packaging. Several types of goods are exempt from being returned,
            including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Personal care items (for hygiene reasons)</li>
            <li>Underwear and swimwear (for hygiene reasons)</li>
            <li>Custom or personalized items</li>
            <li>
              Items marked as &quot;Final Sale&quot; or
              &quot;Non-Returnable&quot;
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Return Timeframe</h2>
          <p>
            You have 30 days from the date of delivery to initiate a return.
            After 30 days, we cannot offer you a refund or exchange.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Return Process</h2>
          <p>To start a return, please follow these steps:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Log in to your account and go to the Order History section.</li>
            <li>Select the order containing the item(s) you wish to return.</li>
            <li>Select the specific item(s) and reason for return.</li>
            <li>Print the return shipping label if provided.</li>
            <li>
              Pack the item(s) securely in the original packaging if possible.
            </li>
            <li>Attach the return label to the outside of the package.</li>
            <li>
              Drop off the package at the specified shipping carrier location.
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Return Shipping</h2>
          <p>
            You will be responsible for paying the return shipping costs unless
            the item is defective or we made an error. Return shipping costs are
            non-refundable.
          </p>
          <p>
            For returns due to defects or errors on our part, we will provide a
            prepaid return shipping label.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Refunds</h2>
          <p>
            Once we receive your return, we will inspect it and notify you of
            the status of your refund. If your return is approved, we will
            initiate a refund to your original method of payment. You will
            receive the credit within a certain amount of days, depending on
            your payment provider&apos;s policies.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Credit Card Refunds:</strong> 5-10 business days to
              process
            </li>
            <li>
              <strong>Debit Card Refunds:</strong> 5-10 business days to process
            </li>
            <li>
              <strong>PayPal Refunds:</strong> 1-3 business days to process
            </li>
            <li>
              <strong>Store Credit:</strong> Immediately available in your
              account
            </li>
          </ul>
          <p>
            Shipping costs are non-refundable. If you received free shipping on
            your original order, the standard shipping cost will be deducted
            from your refund.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Exchanges</h2>
          <p>
            If you need to exchange an item for a different size or color,
            please return the original item and place a new order. This ensures
            the fastest processing time.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            7. Damaged or Defective Items
          </h2>
          <p>
            If you receive a damaged or defective item, please contact our
            Customer Service team within 48 hours of receiving your order.
            Please provide photos of the damage or defect when contacting us.
          </p>
          <p>
            For damaged or defective items, we will cover the return shipping
            costs and expedite a replacement or refund.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Sale Items</h2>
          <p>
            Sale items with discounts of less than 50% follow our standard
            return policy. Items with discounts of 50% or more are final sale
            and cannot be returned unless they are defective.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            9. International Returns
          </h2>
          <p>
            For international orders, the same return policy applies, but
            customers are responsible for any customs fees, duties, or taxes
            incurred during the return shipping process.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            10. Contact Information
          </h2>
          <p>
            If you have any questions about our Returns Policy, please contact
            our Customer Service team:
          </p>
          <address className="not-italic">
            <p>Email: returns@orium.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday - Friday, 9am - 5pm EST</p>
          </address>
        </div>

        <div className="mt-10 pt-6 border-t">
          <p>
            This Returns Policy is part of our
            <Link
              href="/terms"
              className="text-black font-medium hover:underline mx-1"
            >
              Terms and Conditions
            </Link>
            and should be read in conjunction with them.
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
