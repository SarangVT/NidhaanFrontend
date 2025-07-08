'use client'

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <h1 className="text-2xl font-bold mb-6">Select a Payment Method</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">

          <section className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Delivering to Sarang Thakare</h2>
            <p className="text-sm text-gray-700">
              Unit 210 C2, First Floor, VSB (Vikram Sarabhai) Hostel,<br />
              Indian Institute of Technology, Indore,<br />
              Khandwa Road, Simrol, INDORE, MADHYA PRADESH, 452020, India
            </p>
            <button className="mt-2 text-blue-600 hover:underline text-sm">Add delivery instructions</button>
          </section>

          <section className="border rounded-xl p-5 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">Payment method</h2>

            <div>
              <p className="font-medium">Your available balance</p>
              <div className="flex items-center gap-2 mt-1">
                <input type="radio" name="payment" disabled />
                <span>Amazon Pay Balance ₹0.00 Unavailable</span>
              </div>
              <p className="text-xs text-red-600">Insufficient balance.</p>
              <button className="text-blue-600 text-xs mt-1 hover:underline">Add money & get rewarded</button>
            </div>

            <div>
              <p className="font-medium">UPI</p>
              <div className="flex items-center gap-2 mt-1">
                <input type="radio" name="payment" />
                <span>Amazon Pay UPI - State Bank of India **1552</span>
              </div>
            </div>

            <div>
              <p className="font-medium">Another payment method</p>
              <div className="flex items-center gap-2 mt-1">
                <input type="radio" name="payment" />
                <span>Credit or debit card</span>
              </div>
              <div className="flex gap-2 mt-2">
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <img src="/mastercard.svg" alt="MasterCard" className="h-6" />
                <img src="/rupay.svg" alt="RuPay" className="h-6" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <span>Net Banking</span>
              <select className="ml-2 border rounded px-2 py-1 text-sm">
                <option>Choose an Option</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <span>EMI</span>
            </div>

            <div className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <span>Cash on Delivery / Pay on Delivery</span>
            </div>

            <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 font-semibold text-sm px-4 py-2 rounded">
              Use this payment method
            </button>
          </section>
        </div>

        <div className="border rounded-xl p-5 shadow-sm space-y-2">
          <h2 className="font-semibold mb-4 text-lg">Order Summary</h2>
          <div className="flex justify-between">
            <span>Items:</span>
            <span>--</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>--</span>
          </div>
          <div className="flex justify-between">
            <span>Promotion Applied:</span>
            <span>--</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Order Total:</span>
            <span>₹1,594.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
