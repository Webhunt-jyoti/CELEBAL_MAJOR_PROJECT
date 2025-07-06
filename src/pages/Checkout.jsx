// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// import { getFunctions, httpsCallable } from "firebase/functions";
// import { getApp } from "firebase/app";

// const functions = getFunctions(app);
// const sendReceiptEmail = httpsCallable(functions, "sendReceiptEmail");

// function Checkout() {
//     const { cart, dispatch } = useCart();
//     const { currentUser } = useAuth();
//     const navigate = useNavigate();

//     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     /* -------- Razorpay loader -------- */
//     const loadScript = (src) =>
//         new Promise((resolve) => {
//             const s = document.createElement("script");
//             s.src = src;
//             s.onload = () => resolve(true);
//             s.onerror = () => resolve(false);
//             document.body.appendChild(s);
//         });

//     /* -------- PDF generator -------- */
//     const generateAndDownloadPDF = (paymentId, cartItems, total) => {
//         const doc = new jsPDF();

//         doc.setFontSize(20).text("Pyara E-Receipt", 14, 20);

//         doc.setFontSize(12).text(`Payment ID: ${paymentId}`, 14, 30);
//         doc.text(`Date: ${new Date().toLocaleString()}`, 14, 36);

//         autoTable(doc, {
//             startY: 45,
//             head: [["Product", "Qty", "Price", "Total"]],
//             body: cartItems.map((item) => [
//                 item.name,                       // ✅ here
//                 item.quantity,
//                 `${item.price}`,
//                 `${(item.price * item.quantity).toFixed(2)}`,
//             ]),
//             theme: "grid",
//             headStyles: { fillColor: [63, 81, 181] },
//         });

//         const y = doc.lastAutoTable.finalY || 70;
//         doc.setFontSize(14).text(`Grand Total: ${total.toFixed(2)}`, 14, y + 10);
//         doc.setFontSize(12).text("Thank you for shopping with Pyara !", 14, y + 20);

//         doc.save(`E_Receipt_${paymentId}.pdf`);
//     };

//     /* -------- Razorpay checkout -------- */
//     const pay = async () => {
//         if (!(await loadScript("https://checkout.razorpay.com/v1/checkout.js"))) {
//             alert("Unable to load Razorpay.");
//             return;
//         }

//         const rzp = new window.Razorpay({
//             key: "rzp_test_Fo7PUocnelZMaH",
//             amount: total * 100,
//             currency: "INR",
//             name: "E‑Shop",
//             description: "Order Payment",
//             prefill: { email: currentUser?.email },
//             handler: (res) => {
//                 generateAndDownloadPDF(res.razorpay_payment_id, cart, total);
//                 dispatch({ type: "CLEAR_CART" });
//                 navigate("/");
//             },
//         });

//         rzp.open();

//         // -------------------**
//         const sendEmail = async (email, total, items, paymentId) => {
//             const app = getApp();
//             const functions = getFunctions(app);
//             const sendReceiptEmail = httpsCallable(functions, "sendReceiptEmail");

//             const htmlContent = `
//     <h2>🧾 E-Shop Receipt</h2>
//     <p><strong>Payment ID:</strong> ${paymentId}</p>
//     <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
//     <h3>Order Details:</h3>
//     <ul>
//       ${items.map(item => `<li>${item.name} x${item.quantity} — ₹${item.price * item.quantity}</li>`).join("")}
//     </ul>
//     <p><strong>Total:</strong> ₹${total}</p>
//     <p>Thank you for shopping with E-Shop!</p>
//   `;

//             await sendReceiptEmail({
//                 email,
//                 subject: "Your E-Shop Payment Receipt",
//                 html: htmlContent
//             });
//         };
//         // -----------------------**
//     };

//     /* -------- JSX -------- */
//     return (
//         <div className="max-w-3xl mx-auto p-6 pt-20">
//             <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
//                 Checkout
//             </h2>

//             <div className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl mb-4 border-b pb-2 text-gray-700">
//                     🧾 Order Summary
//                 </h3>

//                 {cart.map((item) => (
//                     <div
//                         key={item.id}
//                         className="flex justify-between border-b py-2 text-gray-800"
//                     >
//                         <span>
//                             {item.name} (x{item.quantity})
//                         </span>
//                         <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//                     </div>
//                 ))}

//                 <div className="text-right text-xl mt-4 font-semibold text-indigo-800">
//                     Total: ₹{total.toFixed(2)}
//                 </div>

//                 <button
//                     onClick={pay}
//                     className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow"
//                 >
//                     💳 Pay Now
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Checkout;
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Checkout() {
  const { cart, dispatch } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  /*const generatePDF = (paymentId, cart, total) => {
    const doc = new jsPDF();
    doc.text("Pyara E-Receipt", 14, 20);
    doc.text(`Payment ID: ${paymentId}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: [["Product", "Qty", "Price", "Total"]],
      body: cart.map(i => [i.name, i.quantity, i.price, (i.price * i.quantity).toFixed(2)]),
      theme: "grid",
      headStyles: { fillColor: [63, 81, 181] },
    });

    const y = doc.lastAutoTable.finalY + 10;
    doc.text(`Total: ₹${total.toFixed(2)}`, 14, y);
    return doc.output("datauristring");
  };*/

  const generatePDF = (paymentId, cartItems, total) => {
    const doc = new jsPDF();

    doc.setFontSize(20).text("Pyara E-Receipt", 14, 20);

    doc.setFontSize(12).text(`Payment ID: ${paymentId}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: [["Product", "Qty", "Price", "Total"]],
      body: cartItems.map((item) => [
        item.name,                       // ✅ here
        item.quantity,
        `${item.price}`,
        `${(item.price * item.quantity).toFixed(2)}`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [63, 81, 181] },
    });

    const y = doc.lastAutoTable.finalY || 70;
    doc.setFontSize(14).text(`Grand Total: ${total.toFixed(2)}`, 14, y + 10);
    doc.setFontSize(12).text("Thank you for shopping with Pyara !", 14, y + 20);

    doc.save(`E_Receipt_${paymentId}.pdf`);
    return doc.output("datauristring");
  };

  const sendEmail = async (email, cart, total, paymentId, pdfBase64) => {
    const res = await fetch("http://localhost:5000/send-receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, items: cart, total, paymentId, pdfBase64 }),
    });
    if (!res.ok) throw new Error("Email failed");
  };

  const loadScript = src => new Promise((res) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => res(true);
    s.onerror = () => res(false);
    document.body.appendChild(s);
  });

  const pay = async () => {
    if (!(await loadScript("https://checkout.razorpay.com/v1/checkout.js"))) {
      return alert("Razorpay SDK failed to load.");
    }
    const rzp = new window.Razorpay({
      key: "rzp_test_Fo7PUocnelZMaH",
      amount: total * 100,
      currency: "INR",
      name: "Pyara",
      handler: async (res) => {
        const pid = res.razorpay_payment_id;

        // ⏳ Add a short delay before generating PDF to fix SVG error
        setTimeout(async () => {
          try {
            const pdf = generatePDF(pid, cart, total);
            await sendEmail(currentUser.email, cart, total, pid, pdf);
            console.log("✅ Email sent");
          } catch (e) {
            console.error("❌ Failed to send email:", e);
          }

          dispatch({ type: "CLEAR_CART" });
          navigate("/");
        }, 300); // delay in milliseconds (adjust if needed)
      }

    });
    rzp.open();
  };

  // return (
  //   <div className="container mx-auto p-6 pt-20">
  //     <h2>Checkout</h2>
  //     <div>
  //       {cart.map(i => (
  //         <div key={i.id} className="flex justify-between">
  //           {i.name} x{i.quantity} – ₹{(i.price * i.quantity).toFixed(2)}
  //         </div>
  //       ))}
  //       <p>Total: ₹{total.toFixed(2)}</p>
  //       <button onClick={pay}>Pay Now</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="max-w-3xl mx-auto p-6 pt-20">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Checkout
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl mb-4 border-b pb-2 text-gray-700">
          🧾 Order Summary
        </h3>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2 text-gray-800"
          >
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="text-right text-xl mt-4 font-semibold text-indigo-800">
          Total: ₹{total.toFixed(2)}
        </div>

        <button
          onClick={pay}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow"
        >
          💳 Pay Now
        </button>
      </div>
    </div>
  );

}

