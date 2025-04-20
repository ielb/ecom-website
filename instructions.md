### Instructions for Cursor AI: Build a Fashion E-Commerce Website Inspired by the Design

Follow these detailed instructions to create a fashion e-commerce website using **Next.js** and **Shadcn UI** while drawing inspiration from the uploaded design ![alt text](original-45dbe8021eb8072e0477b602773e7d19.webp).

---

#### 1. **Project Setup**
   - **Framework:** Use Next.js for server-side rendering and routing.  
   - **UI Library:** Install and configure Shadcn UI components.  
   - **Styling:** Use Tailwind CSS for consistent styling across the website.  
   - **Dependencies:** Install necessary packages:
     ```bash
     npm install next react react-dom tailwindcss shadcn-ui axios
     ```

---

#### 2. **Define the Page Structure**
   - **Homepage:**  
     - Full-width hero section with a centered title, description, and call-to-action button ("Buy Now").  
     - Sections for "New Collection" and "Featured Products" with grid-based layouts.  
   - **Product Page:**  
     - Display product images prominently with a carousel for multiple views.  
     - Include details like price, description, and size selector with a clean layout.  
   - **Cart and Checkout Pages:**  
     - Minimalistic design for easy navigation and clear actions.  

---

#### 3. **Design the Layout**
   - **Navbar:**  
     - A centered logo with navigation links ("Men," "Women," "Kids," etc.).  
     - A sticky bar at the top for promotions (e.g., "Get 25% off on summer sales").  
   - **Footer:**  
     - Include links for support, social media, and copyright text.  

---

#### 4. **Component Implementation**
   - **Hero Section:**  
     - Use a full-width background image with overlaid text and a CTA button.  
   - **Product Cards:**  
     - Use Shadcn's card components to display product images, names, and prices. Add hover effects for interactivity.  
   - **Button Styles:**  
     - Shadcn buttons with rounded edges, shadows, and hover transitions.  

---

#### 5. **Design Styling**
   - **Typography:**  
     - Use modern, elegant fonts similar to the inspiration design (e.g., sans-serif for text, bold for headings).  
   - **Colors:**  
     - A clean white background with black and neutral tones for text and accents.  
   - **Spacing:**  
     - Add ample white space between sections for a minimalist look.  

---

#### 6. **Incorporate Functionality**
   - **Dynamic Product Listing:** Fetch product data from the backend and map it to Shadcn components.  
   - **Filters:** Add category-based and price range filters with sidebars.  
   - **Cart Management:** Use state management (e.g., Zustand or Redux) for cart logic.  

---

#### 7. **Optimize for Responsiveness**
   - Use Tailwind's responsive classes to ensure the design works seamlessly across all screen sizes.  

---

#### 8. **Inspiration Features from the Uploaded Design**
   - **Hero Image:** Use high-quality product images with soft, natural lighting.  
   - **Typography & Alignment:** Keep text aligned and use bold, modern headings for emphasis.  
   - **Sections:** Create cleanly divided sections for "New Arrivals" and "Featured Collections."  

---

#### 9. **Final Testing**
   - Test on multiple devices and browsers to ensure responsiveness and functionality.  
   - Validate the user flow for shopping, cart management, and checkout.  

---
