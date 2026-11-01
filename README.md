# CampusFind – Campus Lost & Found Portal

**CampusFind** is a modern, responsive, and student-focused single-page web application designed for college campuses. It enables students, faculty, and campus security staff to report lost belongings, log found items, browse active listings with real-time search and multi-criteria filters, and securely contact reporters to reclaim their belongings.

> **Note for Practical Examination:** This project is developed strictly using **HTML5**, **CSS3**, **Bootstrap 5.3.3**, and **Vanilla JavaScript**. No external frameworks (such as React, Angular, Vue, Tailwind CSS, Node.js, or PHP) are used. All sample data is loaded as demonstration data.

---

## 🌟 Key Features

1. **Responsive Bootstrap 5 UI/UX**
   - Clean, modern university-oriented design with Royal Blue (`#0D6EFD`) primary theme, Light Grey/Blue background (`#F5F8FC`), and Dark Navy accents.
   - Fully responsive on Desktop (1440px), Tablet (768px), and Mobile (375px).
   - Glassmorphic fixed navigation bar with mobile hamburger menu and scroll detection.

2. **Hero Section with Dual Quick Actions & Instant Search**
   - High-impact headline: *"Lost Something on Campus?"*.
   - Direct shortcuts: **Report Lost Item** and **Report Found Item** (pre-selects the type in the reporting modal).
   - Instant search bar that directly filters the browse inventory.

3. **Dynamic Statistics Counter**
   - 100% dynamic calculation from `state.items`:
     - **Total Reports** (`state.items.length`)
     - **Lost Items** (`state.items.filter(item => item.type === "Lost").length`)
     - **Found Items** (`state.items.filter(item => item.type === "Found").length`)
     - **Successfully Returned Items** (`state.items.filter(item => item.status === "Returned").length`)
   - **Guaranteed Consistency**: Returned Items count is strictly calculated from the items array, ensuring it never exceeds Total Reports.
   - Smooth numeric counter animation on page load and live updates when items are added or marked returned.

4. **Category Navigation**
   - 5 dedicated category cards:
     - 💻 **Electronics**
     - 📄 **Documents & IDs**
     - 🕶️ **Accessories**
     - 📚 **Books & Study Material**
     - 🎒 **Personal Belongings**
   - Live item counts per category and one-click filtering.

5. **Advanced Search & Filtering Engine**
   - **Real-time Live Search**: Filter by item name, specific room/location, or keywords.
   - **Category Dropdown Filter**.
   - **Status Toggle Buttons**: Filter by *All*, *Lost Items*, or *Found Items*.
   - **Sorting Options**: Sort by *Newest First* or *Oldest First*.
   - **Empty State Fallback**: Helpful empty state card with one-click filter reset if no items match.

6. **Interactive Bootstrap Modals**
   - **Report Item Modal**:
     - Radio toggle for *Lost* vs *Found*.
     - Item name, category, campus location, date, description, student contact info, and optional image URL.
     - Bootstrap form validation (`needs-validation` / `was-validated`).
     - Dynamic listing addition without page refresh.
     - Automatic statistics incrementation.
     - Toast notification on submission.
   - **Contact / Claim Modal**:
     - Displays full item metadata, campus location, and reporter contact email/phone.
     - Direct message simulation form.
     - **"Mark as Returned / Resolved"** button to simulate completed item returns.

7. **How It Works & About Sections**
   - 3-step illustrated walkthrough of the campus reporting cycle.
   - Designated Campus Safe Exchange Zone guidelines for safe physical handovers.
   - Mission statement and university security integration details.

8. **Campus Support & Contact Section**
   - Campus Lost & Found office location (Student Center Rm 102), operating hours, and security hotline.
   - Interactive support request form with validation and toast alert feedback.

9. **Data Persistence (localStorage)**
   - Initialized with 10 realistic campus sample items (AirPods, Textbooks, Dell Chargers, Student IDs, Flasks, Calculators, etc.), including 3 items with active "Returned" status.
   - User-submitted items persist across page refreshes via browser `localStorage`.
   - Includes a **"Reset Demo Data"** button in the footer to restore initial demo items at any time.

---

## 📁 Project File Structure

```text
Campus-Lost-Found/
│
├── index.html       # Semantic HTML5 single-page structure and Bootstrap markup
├── style.css        # CSS3 custom styling, color variables, animations, and responsive media queries
├── script.js        # Vanilla JavaScript logic: state management, filtering, validation, modals, and toasts
└── README.md        # Complete documentation, setup instructions, and examination notes
```

---

## 🚀 How to Run the Project in VS Code

### Method 1: Using VS Code Live Server (Recommended)
1. Open **Visual Studio Code**.
2. Click **File > Open Folder...** and select the `Campus-Lost-Found` folder (or the root project directory).
3. Ensure the **Live Server** extension by *Ritwick Dey* is installed from the VS Code Extensions Marketplace (`Ctrl+Shift+X` and search for "Live Server").
4. In the VS Code Explorer pane on the left, right-click on `index.html`.
5. Click **"Open with Live Server"** (or press `Alt + L, Alt + O`).
6. Your default web browser will open at:
   ```text
   http://127.0.0.1:5500/index.html
   ```

### Method 2: Direct Browser Execution
1. Navigate to the `Campus-Lost-Found` folder in your file manager (Windows File Explorer).
2. Double-click `index.html` (or right-click and choose **Open with > Google Chrome / Microsoft Edge / Firefox**).
3. The application will run smoothly as all dependencies (Bootstrap 5, Bootstrap Icons, Google Fonts) load via verified CDNs.

---

## 🧪 Testing & Verification Checklist

- [x] **Navigation Bar**: Responsive brand logo, navigation links scroll to respective sections, hamburger toggle works seamlessly on tablet and mobile.
- [x] **Hero Actions**: "Report Lost Item" opens modal with *Lost* selected; "Report Found Item" opens modal with *Found* selected; hero search navigates to browse section.
- [x] **Statistics**: Smooth count-up animation; counts increment dynamically when new items are added or marked returned.
- [x] **Category Cards**: Clicking any category filters the items grid and updates the category dropdown.
- [x] **Browse Section**: Live search filters cards instantly; status buttons (*All*, *Lost*, *Found*) filter accurately; sort changes card order.
- [x] **Empty State**: Displays if search query yields no results with a working "Clear Filters" button.
- [x] **Report Modal**: Validates required inputs with Bootstrap validation feedback; dynamically injects the new item into the DOM and saves to `localStorage`.
- [x] **Contact Modal**: Opens with pre-filled item and reporter information; provides working direct message simulation and "Mark as Returned" action.
- [x] **Contact Support Form**: Validates inputs and triggers a Bootstrap toast notification upon submission.
- [x] **Responsive Viewports**: Verified on Desktop (1440px), Tablet (768px), and Mobile (375px) without horizontal scrolling.

---

## 🎓 Academic Practical Examination Details

- **Application Name**: CampusFind – Campus Lost & Found Portal
- **Technology Stack**: HTML5, CSS3, Bootstrap 5.3.3, Vanilla JavaScript, Bootstrap Icons
- **Target Audience**: College students, teaching assistants, campus security, and faculty
- **Storage**: Client-Side `localStorage` with initial seed demonstration dataset
