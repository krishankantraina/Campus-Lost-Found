/**
 * CampusFind – Campus Lost & Found Portal
 * Main Frontend Logic (Vanilla JavaScript)
 * 
 * Features:
 *  - Dynamic Rendering of Items from state
 *  - 100% Dynamic Statistics Calculation directly from item data
 *  - Guaranteed consistency: Returned Items <= Total Reports
 *  - Live Search & Multi-criteria Filtering (Category, Status, Sort)
 *  - Report Modal with Preselected Type & Responsive Type UI
 *  - Immediate display & highlight of newly submitted items
 *  - LocalStorage Data Persistence & Demo Reset
 *  - Contact / Claim Modal with reporter details & Mark as Returned action
 *  - Support Contact Form with validation
 *  - Interactive Toast Notifications
 */

// ==========================================================================
// 1. Initial Demonstration Dataset
// ==========================================================================
const DEFAULT_ITEMS = [
    {
        id: "cf-101",
        name: "Apple AirPods Pro (2nd Gen)",
        category: "Electronics",
        type: "Lost",
        status: "Active",
        location: "Central Library, 2nd Floor Silent Zone",
        date: "2026-10-30",
        description: "White charging case with a navy blue silicone protective sleeve. Small initial 'R' sticker on the back side.",
        reporterName: "Rohan Sharma",
        reporterContact: "rohan.s@campus.edu",
        reporterPhone: "+1 (555) 234-8901",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-laptop",
        isDemo: true
    },
    {
        id: "cf-102",
        name: "Calculus: Early Transcendentals (9th Ed)",
        category: "Books",
        type: "Found",
        status: "Active",
        location: "Mathematics Hall, Room 104",
        date: "2026-10-31",
        description: "Hardcover textbook found tucked under row 3 desk. Contains yellow lecture notes and formula bookmarks inside.",
        reporterName: "Sarah Jenkins (TA)",
        reporterContact: "sarah.ta@campus.edu",
        reporterPhone: "+1 (555) 789-0123",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-book",
        isDemo: true
    },
    {
        id: "cf-103",
        name: "Dell 65W USB-C Laptop Charger",
        category: "Electronics",
        type: "Found",
        status: "Returned", // Successfully reunited with owner
        location: "Engineering Complex, Computer Lab 3",
        date: "2026-10-27",
        description: "Original Dell oval USB Type-C power adapter left plugged into the wall outlet beside terminal 14.",
        reporterName: "Officer David (Campus Security)",
        reporterContact: "securitydesk@campus.edu",
        reporterPhone: "+1 (555) 345-6789",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-laptop",
        isDemo: true
    },
    {
        id: "cf-104",
        name: "University Student ID Card & Keycard",
        category: "Documents",
        type: "Lost",
        status: "Active",
        location: "Student Union Dining Courtyard",
        date: "2026-10-29",
        description: "Student identity badge for Priya S. (ID: ENG-2024-883) with university lanyard and magnetic dorm access fob.",
        reporterName: "Priya S.",
        reporterContact: "priya.s@campus.edu",
        reporterPhone: "+1 (555) 456-7890",
        image: "https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-file-earmark-text",
        isDemo: true
    },
    {
        id: "cf-105",
        name: "Hydro Flask 32oz (Cobalt Blue)",
        category: "Personal Belongings",
        type: "Found",
        status: "Active",
        location: "Campus Recreation Gym, Bench Near Lockers",
        date: "2026-10-31",
        description: "Stainless steel vacuum insulated flask with NASA and code stickers. Slight scratch near base ring.",
        reporterName: "Gym Information Desk",
        reporterContact: "recreation@campus.edu",
        reporterPhone: "+1 (555) 567-8901",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-bag",
        isDemo: true
    },
    {
        id: "cf-106",
        name: "Ray-Ban Classic Aviator Sunglasses",
        category: "Accessories",
        type: "Lost",
        status: "Returned", // Successfully reunited with owner
        location: "Cafeteria Outdoor Lawn Area",
        date: "2026-10-26",
        description: "Gold frame aviators with green lenses enclosed in a brown textured leather snap case. Slipped from jacket pocket.",
        reporterName: "Marcus Lee",
        reporterContact: "marcus.l@campus.edu",
        reporterPhone: "+1 (555) 678-9012",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-sunglasses",
        isDemo: true
    },
    {
        id: "cf-107",
        name: "Casio fx-991EX Scientific Calculator",
        category: "Electronics",
        type: "Found",
        status: "Active",
        location: "Science Complex B, Room 202",
        date: "2026-10-30",
        description: "Black and white ClassWiz scientific calculator with name 'A. Patel' etched faintly on protective slide case.",
        reporterName: "Physics Department Staff",
        reporterContact: "physics.dept@campus.edu",
        reporterPhone: "+1 (555) 890-1234",
        image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-laptop",
        isDemo: true
    },
    {
        id: "cf-108",
        name: "Black Leather Bi-Fold Wallet",
        category: "Personal Belongings",
        type: "Lost",
        status: "Active",
        location: "Campus North Shuttle Bus Line A",
        date: "2026-10-29",
        description: "Black leather wallet containing campus transit card, state ID, and student meal pass. Deeply appreciated if returned!",
        reporterName: "Daniel Chen",
        reporterContact: "daniel.c@campus.edu",
        reporterPhone: "+1 (555) 901-2345",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-wallet2",
        isDemo: true
    },
    {
        id: "cf-109",
        name: "Texas Instruments TI-84 Plus CE",
        category: "Electronics",
        type: "Lost",
        status: "Active",
        location: "Engineering Quad, Bench 5",
        date: "2026-10-28",
        description: "Color screen graphing calculator in dark blue casing with name label peeling off on the rear battery compartment.",
        reporterName: "Aiden Scott",
        reporterContact: "aiden.scott@campus.edu",
        reporterPhone: "+1 (555) 321-7654",
        image: "https://images.unsplash.com/photo-1611117775350-ac3950990985?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-laptop",
        isDemo: true
    },
    {
        id: "cf-110",
        name: "Dorm Room Keys with Blue Lanyard",
        category: "Personal Belongings",
        type: "Found",
        status: "Returned", // Successfully reunited with owner
        location: "East Campus Residential Quad",
        date: "2026-10-25",
        description: "Set of two brass keys on a campus athletics lanyard with a silver carabiner clip.",
        reporterName: "Resident Advisor Maya",
        reporterContact: "housing@campus.edu",
        reporterPhone: "+1 (555) 654-9870",
        image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
        categoryIcon: "bi-bag",
        isDemo: true
    }
];

// ==========================================================================
// 2. Application State Management
// ==========================================================================
const STORAGE_KEY = "campusfind_items_v2";

let state = {
    items: [],
    currentCategory: "All",
    currentType: "All", // "All", "Lost", "Found"
    searchQuery: "",
    sortBy: "newest",
    activeContactItem: null
};

// Map category names to icons
const CATEGORY_ICONS = {
    "Electronics": "bi-laptop",
    "Documents": "bi-file-earmark-text",
    "Accessories": "bi-sunglasses",
    "Books": "bi-book",
    "Personal Belongings": "bi-bag"
};

// ==========================================================================
// 3. Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    loadStateFromStorage();
    setupEventListeners();
    renderStats();
    updateCategoryBadges();
    renderItems();
    setDefaultDateInModal();
});

/**
 * Loads data from localStorage or seeds with DEFAULT_ITEMS
 * Cleans up any legacy detached keys from earlier runs
 */
function loadStateFromStorage() {
    try {
        // Clean legacy detached counter key to guarantee consistency
        localStorage.removeItem("campusfind_returned_count");

        const storedItems = localStorage.getItem(STORAGE_KEY);
        if (storedItems) {
            const parsed = JSON.parse(storedItems);
            if (Array.isArray(parsed) && parsed.length > 0) {
                state.items = parsed;
            } else {
                state.items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
                saveStateToStorage();
            }
        } else {
            // First time initialization
            state.items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
            saveStateToStorage();
        }
    } catch (e) {
        console.error("Error reading localStorage:", e);
        state.items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
    }
}

/**
 * Persists current items array to localStorage
 */
function saveStateToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
        console.error("Error saving to localStorage:", e);
    }
}

/**
 * Sets today's date formatted as YYYY-MM-DD for report modal
 */
function setDefaultDateInModal() {
    const dateInput = document.getElementById("reportDate");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
        dateInput.max = today; // Prevent future dates
    }
}

// ==========================================================================
// 4. Statistics Rendering (100% Dynamic from state.items)
// ==========================================================================
/**
 * All statistics are calculated directly and dynamically from the actual item data.
 * Returned Items count can NEVER exceed Total Reports because:
 *   returnedItems = state.items.filter(item => item.status === "Returned").length <= state.items.length
 */
function renderStats() {
    const totalReports = state.items.length;
    const lostItems = state.items.filter(item => item.type === "Lost").length;
    const foundItems = state.items.filter(item => item.type === "Found").length;
    const returnedItems = state.items.filter(item => item.status === "Returned").length;

    animateValue("statTotal", totalReports);
    animateValue("statLost", lostItems);
    animateValue("statFound", foundItems);
    animateValue("statReturned", returnedItems);
}

/**
 * Smooth numeric counter animation
 */
function animateValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startValue = parseInt(element.textContent.replace(/[^0-9]/g, ""), 10) || 0;
    if (startValue === targetValue) {
        element.textContent = targetValue;
        return;
    }

    const duration = 500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentVal;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    }

    requestAnimationFrame(updateCounter);
}

/**
 * Updates item count indicators in category cards
 */
function updateCategoryBadges() {
    const categories = ["Electronics", "Documents", "Accessories", "Books", "Personal Belongings"];
    categories.forEach(cat => {
        const count = state.items.filter(item => item.category === cat).length;
        const badge = document.querySelector(`[data-category-count="${cat}"]`);
        if (badge) {
            badge.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
        }
    });
}

// ==========================================================================
// 5. Items Rendering & Filtering Logic
// ==========================================================================
function getFilteredItems() {
    return state.items.filter(item => {
        // Status filter (Lost, Found, or All)
        if (state.currentType !== "All" && item.type !== state.currentType) {
            return false;
        }

        // Category filter
        if (state.currentCategory !== "All" && item.category !== state.currentCategory) {
            return false;
        }

        // Live Search query (name, location, description, category)
        if (state.searchQuery.trim() !== "") {
            const query = state.searchQuery.toLowerCase().trim();
            const matchName = item.name.toLowerCase().includes(query);
            const matchLoc = item.location.toLowerCase().includes(query);
            const matchDesc = item.description.toLowerCase().includes(query);
            const matchCat = item.category.toLowerCase().includes(query);
            if (!matchName && !matchLoc && !matchDesc && !matchCat) {
                return false;
            }
        }

        return true;
    }).sort((a, b) => {
        if (state.sortBy === "newest") {
            return new Date(b.date) - new Date(a.date);
        } else if (state.sortBy === "oldest") {
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    });
}

function renderItems(highlightFirstId = null) {
    const container = document.getElementById("itemsGrid");
    const emptyState = document.getElementById("emptyState");
    const countBadge = document.getElementById("itemsCountBadge");

    if (!container) return;

    const filtered = getFilteredItems();

    if (countBadge) {
        countBadge.textContent = `Showing ${filtered.length} of ${state.items.length} items`;
    }

    if (filtered.length === 0) {
        container.innerHTML = "";
        if (emptyState) emptyState.classList.remove("d-none");
        return;
    }

    if (emptyState) emptyState.classList.add("d-none");

    const html = filtered.map(item => createItemCardHTML(item, item.id === highlightFirstId)).join("");
    container.innerHTML = html;
}

/**
 * Generates card HTML for an individual item
 */
function createItemCardHTML(item, isJustAdded = false) {
    const isLost = item.type === "Lost";
    const statusBadgeClass = item.status === "Returned" ? "status-returned" : (isLost ? "status-lost" : "status-found");
    const statusText = item.status === "Returned" ? "Returned to Owner" : (isLost ? "Lost Item" : "Found Item");
    const statusIcon = item.status === "Returned" ? "bi-check2-circle" : (isLost ? "bi-exclamation-circle" : "bi-check-circle");
    const iconClass = CATEGORY_ICONS[item.category] || "bi-tag";
    const highlightClass = isJustAdded ? "just-added" : "";

    // Format display date
    let formattedDate = item.date;
    try {
        const dateObj = new Date(item.date);
        formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch (e) {
        // Fallback to raw string
    }

    // Image fallback handling
    const imageElement = item.image
        ? `<img src="${escapeHTML(item.image)}" class="item-img" alt="${escapeHTML(item.name)}" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'item-img-placeholder\\'><i class=\\'bi ${iconClass}\\'></i><small class=\\'mt-2 text-muted\\'>${item.category}</small></div>';">`
        : `<div class="item-img-placeholder"><i class="bi ${iconClass}"></i><small class="mt-2 text-muted">${item.category}</small></div>`;

    return `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="item-card ${highlightClass}">
                <div class="item-img-container">
                    ${imageElement}
                    <span class="item-status-badge ${statusBadgeClass}">
                        <i class="bi ${statusIcon} me-1"></i>${statusText}
                    </span>
                    <span class="item-category-pill">
                        <i class="bi ${iconClass} me-1 text-primary"></i>${escapeHTML(item.category)}
                    </span>
                </div>
                <div class="item-card-body">
                    <div class="item-meta">
                        <span><i class="bi bi-calendar3"></i> ${formattedDate}</span>
                    </div>
                    <h5 class="item-title" title="${escapeHTML(item.name)}">${escapeHTML(item.name)}</h5>
                    <div class="text-danger fw-semibold small mb-2 text-truncate" title="${escapeHTML(item.location)}">
                        <i class="bi bi-geo-alt-fill me-1"></i>${escapeHTML(item.location)}
                    </div>
                    <p class="item-desc" title="${escapeHTML(item.description)}">${escapeHTML(item.description)}</p>
                    <div class="item-card-footer">
                        <small class="text-muted text-truncate" style="max-width: 55%;" title="Reported by ${escapeHTML(item.reporterName)}">
                            <i class="bi bi-person-circle me-1"></i>${escapeHTML(item.reporterName)}
                        </small>
                        <button class="btn btn-outline-primary btn-sm btn-contact-item" onclick="openContactModal('${item.id}')">
                            <i class="bi bi-chat-dots me-1"></i> Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==========================================================================
// 6. Modal Interactions: Report Item & Contact Modal
// ==========================================================================

/**
 * Updates Modal UI Labels based on type (Lost vs Found)
 */
function updateReportModalTypeUI(type) {
    const titleElem = document.getElementById("reportModalLabel");
    const subtitleElem = document.getElementById("reportModalSubtitle");
    const submitBtn = document.getElementById("btnSubmitReport");
    const locationLabel = document.getElementById("reportLocationLabel");
    const dateLabel = document.getElementById("reportDateLabel");

    if (type === "Found") {
        if (titleElem) titleElem.textContent = "Report a Found Item";
        if (subtitleElem) subtitleElem.textContent = "Log an article you found on campus to safely return it to its owner";
        if (submitBtn) submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Submit Found Report';
        if (locationLabel) locationLabel.innerHTML = 'Campus Location Found <span class="text-danger">*</span>';
        if (dateLabel) dateLabel.innerHTML = 'Date Found <span class="text-danger">*</span>';
    } else {
        if (titleElem) titleElem.textContent = "Report a Lost Item";
        if (subtitleElem) subtitleElem.textContent = "Post details of your lost article so whoever finds it can reach out";
        if (submitBtn) submitBtn.innerHTML = '<i class="bi bi-cloud-arrow-up-fill me-1"></i> Submit Lost Report';
        if (locationLabel) locationLabel.innerHTML = 'Last Known Campus Location <span class="text-danger">*</span>';
        if (dateLabel) dateLabel.innerHTML = 'Date Lost <span class="text-danger">*</span>';
    }
}

/**
 * Opens Report Item Modal with pre-selected type
 */
function openReportModal(preselectedType = "Lost") {
    const modalElement = document.getElementById("reportModal");
    if (!modalElement) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    // Reset previous validation styles and inputs
    const form = document.getElementById("reportItemForm");
    if (form) {
        form.classList.remove("was-validated");
        form.reset();
        setDefaultDateInModal();
    }

    // Set preselected radio button explicitly
    const lostRadio = document.getElementById("reportTypeLost");
    const foundRadio = document.getElementById("reportTypeFound");

    if (preselectedType === "Found") {
        if (foundRadio) foundRadio.checked = true;
        if (lostRadio) lostRadio.checked = false;
        updateReportModalTypeUI("Found");
    } else {
        if (lostRadio) lostRadio.checked = true;
        if (foundRadio) foundRadio.checked = false;
        updateReportModalTypeUI("Lost");
    }

    modal.show();
}

/**
 * Handles Report Item Form Submission
 */
function handleReportSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("reportItemForm");

    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        showToast("Please fill in all mandatory fields highlighted in red.", "warning");
        return;
    }

    // Extract form values
    const type = document.querySelector('input[name="reportType"]:checked').value;
    const name = document.getElementById("reportItemName").value.trim();
    const category = document.getElementById("reportCategory").value;
    const location = document.getElementById("reportLocation").value.trim();
    const date = document.getElementById("reportDate").value;
    const description = document.getElementById("reportDescription").value.trim();
    const reporterName = document.getElementById("reportUserName").value.trim();
    const reporterContact = document.getElementById("reportContact").value.trim();
    let imageUrl = document.getElementById("reportImageUrl").value.trim();

    // If image url is left empty, pick a pleasant fallback photo based on category
    if (!imageUrl) {
        const fallbacks = {
            "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
            "Documents": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
            "Accessories": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
            "Books": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
            "Personal Belongings": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
        };
        imageUrl = fallbacks[category] || "";
    }

    const newItemId = "cf-" + Date.now();
    const newItem = {
        id: newItemId,
        name: name,
        category: category,
        type: type,
        status: "Active",
        location: location,
        date: date,
        description: description,
        reporterName: reporterName,
        reporterContact: reporterContact,
        reporterPhone: reporterContact,
        image: imageUrl,
        categoryIcon: CATEGORY_ICONS[category] || "bi-tag",
        isDemo: false
    };

    // Prepend to top of list so it is immediately first
    state.items.unshift(newItem);
    saveStateToStorage();

    // Reset any active filters quietly to ensure the newly added item is 100% visible
    resetFilters(false);

    // Close Modal
    const modalElement = document.getElementById("reportModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }

    // Reset Form
    form.reset();
    form.classList.remove("was-validated");

    // Refresh UI & Dynamic Stats immediately
    renderStats();
    updateCategoryBadges();
    renderItems(newItemId);

    // Scroll smoothly to browse section
    const browseSection = document.getElementById("browse");
    if (browseSection) {
        browseSection.scrollIntoView({ behavior: "smooth" });
    }

    // Trigger Success Notification
    showToast(`Success! Your ${type.toLowerCase()} report "${name}" has been published.`, "success");
}

/**
 * Opens the Contact / Claim details modal for a selected item
 */
function openContactModal(itemId) {
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;

    state.activeContactItem = item;

    const modalElement = document.getElementById("contactModal");
    if (!modalElement) return;

    // Populate modal elements
    document.getElementById("modalItemName").textContent = item.name;
    document.getElementById("modalItemCategory").textContent = item.category;
    document.getElementById("modalItemLocation").textContent = item.location;
    document.getElementById("modalItemDate").textContent = item.date;
    document.getElementById("modalItemDescription").textContent = item.description;

    const modalStatusBadge = document.getElementById("modalItemStatus");
    if (modalStatusBadge) {
        const isLost = item.type === "Lost";
        modalStatusBadge.className = `badge ${item.status === 'Returned' ? 'bg-primary' : (isLost ? 'bg-danger' : 'bg-success')}`;
        modalStatusBadge.textContent = item.status === 'Returned' ? 'Returned to Owner' : (isLost ? 'Lost Item' : 'Found Item');
    }

    // Reporter Info
    document.getElementById("modalReporterName").textContent = item.reporterName;
    const emailLink = document.getElementById("modalReporterEmail");
    if (emailLink) {
        emailLink.textContent = item.reporterContact;
        emailLink.href = item.reporterContact.includes("@") ? `mailto:${item.reporterContact}` : `tel:${item.reporterContact}`;
    }

    // Mark as Returned action button
    const btnMarkClaimed = document.getElementById("btnMarkClaimed");
    if (btnMarkClaimed) {
        if (item.status === "Returned") {
            btnMarkClaimed.innerHTML = `<i class="bi bi-check2-all me-1"></i> Already Marked as Returned`;
            btnMarkClaimed.disabled = true;
            btnMarkClaimed.className = "btn btn-outline-secondary btn-sm";
        } else {
            btnMarkClaimed.innerHTML = `<i class="bi bi-patch-check-fill me-1"></i> Mark as Returned / Resolved`;
            btnMarkClaimed.disabled = false;
            btnMarkClaimed.className = "btn btn-outline-success btn-sm";
        }
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}

/**
 * Handles "Mark as Returned / Resolved" in contact modal
 * Updates state, saves to localStorage, and updates dynamic stats
 */
function handleMarkAsReturned() {
    if (!state.activeContactItem) return;

    const item = state.items.find(i => i.id === state.activeContactItem.id);
    if (!item) return;

    item.status = "Returned";
    saveStateToStorage();

    // Re-render stats and item cards dynamically
    renderStats();
    renderItems();

    const modalElement = document.getElementById("contactModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();

    showToast(`Great news! "${item.name}" has been marked as successfully returned.`, "success");
}

/**
 * Handles sending a quick message to the reporter inside Contact Modal
 */
function handleQuickMessageSubmit(event) {
    event.preventDefault();
    const messageInput = document.getElementById("quickMessageText");
    const senderEmail = document.getElementById("quickSenderEmail");

    if (!messageInput || !messageInput.value.trim() || !senderEmail || !senderEmail.value.trim()) {
        showToast("Please provide both your email address and message.", "warning");
        return;
    }

    // Simulating message dispatch
    const modalElement = document.getElementById("contactModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();

    messageInput.value = "";
    senderEmail.value = "";

    showToast("Message sent to reporter! They will contact you shortly.", "success");
}

/**
 * Handles the general Contact Section form
 */
function handleContactSupportSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("supportContactForm");

    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        showToast("Please complete all required fields.", "warning");
        return;
    }

    const name = document.getElementById("supportName").value;
    form.reset();
    form.classList.remove("was-validated");

    showToast(`Thank you ${name}! Your inquiry has been submitted to Campus Security.`, "success");
}

// ==========================================================================
// 7. Event Listeners Setup
// ==========================================================================
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar-custom");
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // Auto-close mobile navbar collapse when clicking navigation links
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .btn-report-nav");
    const navbarCollapse = document.getElementById("navbarContent");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // Hero quick search
    const heroSearchBtn = document.getElementById("heroSearchBtn");
    const heroSearchInput = document.getElementById("heroSearchInput");
    if (heroSearchBtn && heroSearchInput) {
        const triggerHeroSearch = () => {
            const query = heroSearchInput.value.trim();
            state.searchQuery = query;

            const browseSearchInput = document.getElementById("browseSearchInput");
            if (browseSearchInput) browseSearchInput.value = query;

            renderItems();

            const browse = document.getElementById("browse");
            if (browse) browse.scrollIntoView({ behavior: "smooth" });
        };

        heroSearchBtn.addEventListener("click", triggerHeroSearch);
        heroSearchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") triggerHeroSearch();
        });
    }

    // Browse search input live search
    const browseSearchInput = document.getElementById("browseSearchInput");
    if (browseSearchInput) {
        browseSearchInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value;
            renderItems();
        });
    }

    // Clear search button in input group
    const clearSearchBtn = document.getElementById("clearSearchBtn");
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            if (browseSearchInput) browseSearchInput.value = "";
            state.searchQuery = "";
            renderItems();
        });
    }

    // Status Filter Radio Buttons (All / Lost / Found)
    const statusRadios = document.querySelectorAll('input[name="filterStatus"]');
    statusRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            state.currentType = e.target.value;
            renderItems();
        });
    });

    // Category Dropdown Filter
    const categoryFilterSelect = document.getElementById("categoryFilterSelect");
    if (categoryFilterSelect) {
        categoryFilterSelect.addEventListener("change", (e) => {
            state.currentCategory = e.target.value;
            highlightCategoryCard(e.target.value);
            renderItems();
        });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            state.sortBy = e.target.value;
            renderItems();
        });
    }

    // Reset Filters Button
    const resetFiltersBtn = document.getElementById("resetFiltersBtn");
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener("click", () => resetFilters(true));
    }
    const emptyStateResetBtn = document.getElementById("emptyStateResetBtn");
    if (emptyStateResetBtn) {
        emptyStateResetBtn.addEventListener("click", () => resetFilters(true));
    }

    // Report Item Modal Radio toggle listeners to update UI dynamically
    const reportTypeLost = document.getElementById("reportTypeLost");
    const reportTypeFound = document.getElementById("reportTypeFound");
    if (reportTypeLost) {
        reportTypeLost.addEventListener("change", () => {
            if (reportTypeLost.checked) updateReportModalTypeUI("Lost");
        });
    }
    if (reportTypeFound) {
        reportTypeFound.addEventListener("change", () => {
            if (reportTypeFound.checked) updateReportModalTypeUI("Found");
        });
    }

    // Report Item Form Submit
    const reportForm = document.getElementById("reportItemForm");
    if (reportForm) {
        reportForm.addEventListener("submit", handleReportSubmit);
    }

    // Contact Modal Quick Message Submit
    const quickMessageForm = document.getElementById("quickMessageForm");
    if (quickMessageForm) {
        quickMessageForm.addEventListener("submit", handleQuickMessageSubmit);
    }

    // Mark Claimed button in Contact Modal
    const btnMarkClaimed = document.getElementById("btnMarkClaimed");
    if (btnMarkClaimed) {
        btnMarkClaimed.addEventListener("click", handleMarkAsReturned);
    }

    // Support Contact Form Submit
    const supportForm = document.getElementById("supportContactForm");
    if (supportForm) {
        supportForm.addEventListener("submit", handleContactSupportSubmit);
    }

    // Reset Demo Data Button (in footer)
    const resetDemoBtn = document.getElementById("resetDemoDataBtn");
    if (resetDemoBtn) {
        resetDemoBtn.addEventListener("click", () => {
            if (confirm("Reset all data to the default sample demonstration items?")) {
                state.items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
                saveStateToStorage();
                resetFilters(false);
                renderStats();
                updateCategoryBadges();
                showToast("Demonstration data restored successfully.", "info");
            }
        });
    }
}

/**
 * Filter by Category when clicking category card
 * Toggles back to "All" if clicking currently active card
 */
function filterByCategory(categoryName) {
    if (state.currentCategory === categoryName) {
        state.currentCategory = "All";
    } else {
        state.currentCategory = categoryName;
    }

    // Sync dropdown
    const select = document.getElementById("categoryFilterSelect");
    if (select) select.value = state.currentCategory;

    highlightCategoryCard(state.currentCategory);
    renderItems();

    // Scroll to browse section
    const browse = document.getElementById("browse");
    if (browse) {
        browse.scrollIntoView({ behavior: "smooth" });
    }
}

function highlightCategoryCard(categoryName) {
    document.querySelectorAll(".category-card").forEach(card => {
        if (card.getAttribute("data-category") === categoryName) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

function resetFilters(showNotification = true) {
    state.currentCategory = "All";
    state.currentType = "All";
    state.searchQuery = "";
    state.sortBy = "newest";

    const searchInput = document.getElementById("browseSearchInput");
    if (searchInput) searchInput.value = "";

    const heroInput = document.getElementById("heroSearchInput");
    if (heroInput) heroInput.value = "";

    const catSelect = document.getElementById("categoryFilterSelect");
    if (catSelect) catSelect.value = "All";

    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) sortSelect.value = "newest";

    const allRadio = document.getElementById("statusAll");
    if (allRadio) allRadio.checked = true;

    highlightCategoryCard("All");
    renderItems();

    if (showNotification) {
        showToast("Filters have been reset.", "info");
    }
}

// ==========================================================================
// 8. Toast Helper (Bootstrap 5 Toasts)
// ==========================================================================
function showToast(message, type = "info") {
    const toastContainer = document.getElementById("toastPlacement");
    if (!toastContainer) return;

    const bgClass = type === "success" ? "text-bg-success" : (type === "warning" ? "text-bg-warning" : (type === "danger" ? "text-bg-danger" : "text-bg-primary"));
    const iconClass = type === "success" ? "bi-check-circle-fill" : (type === "warning" ? "bi-exclamation-triangle-fill" : "bi-info-circle-fill");

    const toastId = "toast-" + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center gap-2">
                    <i class="bi ${iconClass} fs-5"></i>
                    <span>${escapeHTML(message)}</span>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const toastElem = document.getElementById(toastId);
    const toastObj = new bootstrap.Toast(toastElem, { delay: 4000 });
    toastObj.show();

    toastElem.addEventListener("hidden.bs.toast", () => {
        toastElem.remove();
    });
}

/**
 * Escapes HTML to prevent XSS in user provided values
 */
function escapeHTML(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
