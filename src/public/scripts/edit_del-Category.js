document.addEventListener("DOMContentLoaded", () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    let activePopover = null; // Track the currently active popover

    popoverTriggerList.forEach((triggerEl) => {
        const popover = new bootstrap.Popover(triggerEl, {
            sanitize: false, // Allow HTML content
            html: true, // Enable HTML in popover
        });

        // Show event: Close active popover if necessary
        triggerEl.addEventListener("click", () => {
            // If there's an active popover and it's not the current one, hide it
            if (activePopover && activePopover !== popover) {
                activePopover.hide();
            }
            // Set the current popover as active
            activePopover = popover;
        });

        // Add event listener when popover is shown
        triggerEl.addEventListener("shown.bs.popover", () => {
            const popoverElement = document.querySelector(".popover");

            // Handle the Cancel button for Edit popovers
            const cancelButton = popoverElement.querySelector(".cancel-btn");
            if (cancelButton) {
                cancelButton.addEventListener("click", () => {
                    popover.hide(); // Hide the popover
                    activePopover = null; // Reset active popover
                });
            }

            // Handle the Cancel button for Delete popovers
            const cancelDeleteButton = popoverElement.querySelector(".cancel-delete-btn");
            if (cancelDeleteButton) {
                cancelDeleteButton.addEventListener("click", () => {
                    popover.hide(); // Hide the popover
                    activePopover = null; // Reset active popover
                });
            }
        });

        // Reset activePopover when popover is hidden
        triggerEl.addEventListener("hidden.bs.popover", () => {
            if (activePopover === popover) {
                activePopover = null;
            }
        });
    });

    // Handle the Delete button click event
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn-confirm")) {
            const categoryId = event.target.dataset.categoryId;

            // Send the request to delete the category
            fetch(`/category/delete/${categoryId}`, {
                method: 'GET',
            })
                .then((response) => {
                    if (response.ok) {
                        // Reload the page after successful deletion
                        window.location.reload();
                    } else {
                        console.error("Failed to delete category.");
                    }
                })
                .catch((error) => console.error("Error deleting category:", error));
        }
    });
});
